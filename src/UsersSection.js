import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import CreateUser from './CreateUser'
import StudentDetails from './StudentDetails'
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
                <StudentDetails canEdit details={details} />
                :
                <></>
        }
    </>
}