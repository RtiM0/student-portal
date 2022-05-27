import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import CreateUser from './CreateUser'
import UserButton from './UserButton'

export default function UsersSection({ users, type }) {
    const [selectedButton, setSelectedButton] = useState(null)
    const [details, setDetails] = useState(null)

    function toggleButton(user) {
        if (selectedButton === user) setSelectedButton(null)
        else setSelectedButton(user)
    }

    useEffect(() => {
        if (selectedButton && type === "Student") {
            API.get("student-portal-api", `/students/${selectedButton.Username}`)
                .then(res => {
                    setDetails(res.User)
                });
        } else setDetails(null)
    }, [selectedButton, type])

    return <>
        <div className='bg-gray-50 my-5 rounded-md px-2 shadow'>
            <p className="font-medium title-font  p-4 flex justify-between"><span>{type}</span><CreateUser type={type}>Create {type}</CreateUser></p>
            <div className="flex flex-wrap -m-2">
                {users !== [] ? users.map(x => {
                    if (x.group === type.toLowerCase()) {
                        return <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <UserButton onClick={toggleButton} isSelected={selectedButton === x} user={x} />
                        </div>
                    }
                    else return false
                }) : ""}
            </div>
        </div>
        {
            details ?
                <div className='py-2'>
                    <div className="bg-white text-left shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Student Information</h3>
                            <button className="rounded ring-1 ring-slate-300 text-slate-300 bg-gray-50 hover:text-white hover:bg-sky-500 hover:ring-sky-500 font-semibold hover:shadow-lg px-3">Save</button>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{details.Username}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{details.UserAttributes.filter((element) => element.Name === 'email')[0]["Value"]}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Department No</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{details.UserAttributes.filter((element) => element.Name === 'custom:departmentNo')[0]["Value"]}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Class No</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{details.UserAttributes.filter((element) => element.Name === 'custom:classNo')[0]["Value"]}</dd>
                                </div>
                                {
                                    details.Item ?
                                        Object.keys(details.Item).map(element => {
                                            if (element !== "studentID") return <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">{element}</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {JSON.stringify(details.Item[element])}
                                                </dd>
                                            </div>
                                            else return false
                                        }
                                        )
                                        :
                                        <></>
                                }


                            </dl>
                        </div>
                    </div>
                </div>
                :
                <></>
        }
    </>
}