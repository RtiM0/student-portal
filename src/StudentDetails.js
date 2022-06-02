import { API } from "aws-amplify"
import { useEffect, useState } from "react"
import CreateField from "./CreateField"

export default function StudentDetails({ details, canEdit }) {

    const [fields, setFields] = useState([])

    useEffect(() => {
        setFields([
            {
                title: "username",
                value: details.Username,
                canEdit: false
            },
            {
                title: "email address",
                value: details.UserAttributes.filter((element) => element.Name === 'email')[0]["Value"],
                canEdit: false
            },
            {
                title: "department no",
                value: details.UserAttributes.filter((element) => element.Name === 'custom:departmentNo')[0]["Value"],
                canEdit: true
            },
            {
                title: "class no",
                value: details.UserAttributes.filter((element) => element.Name === 'custom:classNo')[0]["Value"],
                canEdit: true
            },
            ...details.Items ? details.Items.map(element => (
                {
                    title: element.name,
                    value: element.detail,
                    canEdit: true

                }
            )) : []
        ])
    }, [details])

    const tryJSON = (data) => {
        try {
            return JSON.parse(data)
        } catch {
            return data
        }
    }

    function displayJSON(json) {
        if (typeof json == "string" || typeof json == "number") {
            return json
        }
        if (json instanceof Array) {
            return json.map(element => <p>{element}</p>)
        }
        return <div>
            {Object.keys(json).map(key => <div className="m-2"><span className="capitalize font-semibold">{key}</span>: <span>{displayJSON(json[key])}</span></div>)}
        </div>
    }

    function onSubmitSave(event) {
        event.preventDefault()
        const departmentNo = event.target.department_no.value
        const classNo = event.target.class_no.value

        const detail = {}
        details.Items.forEach(element => {
            detail[element.name] = event.target[element.name.replace(" ", "_")].value
        })
        const params = { body: { username: details.Username } }
        if (departmentNo !== details.UserAttributes.filter((element) => element.Name === 'custom:departmentNo')[0]["Value"] || classNo !== details.UserAttributes.filter((element) => element.Name === 'custom:classNo')[0]["Value"]) {
            params.body["departmentNo"] = departmentNo
            params.body["classNo"] = classNo
        }
        params.body["detail"] = detail
        API.post("student-portal-api", "/updatestudent", params)
            .then(res => console.log(res))
    }


    return <div className='py-2'>
        <div className="bg-white text-left shadow overflow-hidden sm:rounded-lg">
            <form onSubmit={onSubmitSave}>
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Student Information</h3>
                    {
                        canEdit ?
                            <input
                                type="submit"
                                value="Save"
                                className="rounded text-blue-900 bg-blue-100 hover:text-white hover:bg-blue-900 font-medium px-4"
                            />
                            :
                            <></>
                    }
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        {fields.map((element, index) =>
                            <div className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                <dt className="text-sm font-medium text-gray-500 capitalize">{element.title}</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {!canEdit && element.canEdit ?
                                        <input
                                            key={element.value}
                                            type="text"
                                            name={element.title.replace(" ", "_")}
                                            id={element.title.replace(" ", "_")}
                                            defaultValue={element.value}
                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block p-1 sm:text-sm ring-gray-300 ring-1 rounded-md"
                                        />
                                        :
                                        (typeof tryJSON(element.value) == "object") ?
                                            <>
                                                {displayJSON(tryJSON(element.value))}
                                            </>
                                            :
                                            element.value
                                    }
                                </dd>
                            </div>
                        )}
                        {canEdit ?
                            <div className="px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                <CreateField username={details.Username} />
                            </div>
                            :
                            <></>
                        }
                    </dl>
                </div>
            </form>
        </div>
    </div>
}