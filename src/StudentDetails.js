import { API } from "aws-amplify"
import React, { useEffect, useState } from "react"
import CreateField from "./CreateField"
import DeleteButton from "./DeleteButton"
import UpdateField from "./UpdateField"
import { v4 } from 'uuid'

export default function StudentDetails({ details, canEdit, onUpdate }) {

    const [fields, setFields] = useState([])
    useEffect(() => {
        setFields([
            {
                title: "username",
                value: details.Username,
                canEdit: false,
                canDelete: false
            },
            {
                title: "email address",
                value: details.UserAttributes.filter((element) => element.Name === 'email')[0]["Value"],
                canEdit: false,
                canDelete: false
            },
            {
                title: "department no",
                value: details.UserAttributes.filter((element) => element.Name === 'custom:departmentNo')[0]["Value"],
                canEdit: true,
                canDelete: false
            },
            {
                title: "class no",
                value: details.UserAttributes.filter((element) => element.Name === 'custom:classNo')[0]["Value"],
                canEdit: true,
                canDelete: false
            },
            ...details.Items ? details.Items.map(element => (
                {
                    title: element.name,
                    value: element.detail,
                    canEdit: true,
                    canDelete: true

                }
            )) : []
        ])
    }, [details])

    function displayJSON(json) {
        if (typeof json == "string" || typeof json == "number") {
            return json
        }
        if (json instanceof Array) {
            return json.map(element => <p key={v4()}>{element}</p>)
        }
        return <div>
            {Object.keys(json).map(key => <div key={v4()} className="m-2"><span className="capitalize font-semibold">{key}</span>: <span>{displayJSON(json[key])}</span></div>)}
        </div>
    }

    function onSubmitSave(event) {
        event.preventDefault()
        const departmentNo = event.target.department_no.value
        const classNo = event.target.class_no.value

        const detail = {}
        details.Items.forEach(element => {
            if (typeof element.detail != "object") {
                detail[element.name] = event.target[element.name.replace(" ", "_")].value
            }
        })

        const params = { body: { username: details.Username } }
        if (departmentNo !== details.UserAttributes.filter((element) => element.Name === 'custom:departmentNo')[0]["Value"] || classNo !== details.UserAttributes.filter((element) => element.Name === 'custom:classNo')[0]["Value"]) {
            params.body["departmentNo"] = departmentNo
            params.body["classNo"] = classNo
        }

        params.body["detail"] = detail
        API.post("student-portal-api", "/updatestudent", params)
            .then(res => console.log(res))
        onUpdate()
    }


    return <div className='py-2 text-2xl'>
        <div className="bg-white text-left shadow overflow-hidden sm:rounded-lg">
            <form onSubmit={onSubmitSave}>
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                    <h3 className="leading-6 font-medium text-gray-900">Student Information</h3>
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
                            <div key={v4()} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                <dt className="text-lg font-medium text-gray-500 capitalize">{element.title}</dt>
                                <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                    {(typeof element.value == "object") ?
                                        <React.Fragment>
                                            {displayJSON(element.value)}
                                            {canEdit ? <UpdateField username={details.Username} name={element.title} detail={element.value} onUpdate={onUpdate} /> : ""}
                                        </React.Fragment>
                                        :
                                        canEdit && element.canEdit ?
                                            <input
                                                type="text"
                                                name={element.title.replace(" ", "_")}
                                                id={element.title.replace(" ", "_")}
                                                defaultValue={element.value}
                                                className="mt-1 mb-2 focus:ring-blue-500 focus:border-blue-500 block p-1 sm:text-sm ring-gray-300 ring-1 rounded-md"
                                            />
                                            :
                                            element.value
                                    }
                                    {canEdit && element.canDelete
                                        ?
                                        <DeleteButton studentID={details.Username} name={element.title} onUpdate={onUpdate}>Delete</DeleteButton>
                                        :
                                        ""}
                                </dd>
                            </div>
                        )}
                        {canEdit ?
                            <div className="px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                <CreateField username={details.Username} onUpdate={onUpdate} />
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