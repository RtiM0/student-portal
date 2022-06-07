import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import CreateUser from './CreateUser'
import StudentDetails from './StudentDetails'
import UserButton from './UserButton'

export default function UsersSection({ users, type }) {
    const [selectedButton, setSelectedButton] = useState(null)
    const [details, setDetails] = useState(null)
    const [update, setUpdate] = useState(false)

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
    }, [selectedButton, type, update])

    function onUpdate() {
        console.log("HELLo")
        setUpdate(!update)
    }

    return <>
        <div className='bg-gray-50 my-5 rounded-md px-5 pb-5 shadow md:text-2xl'>
            <p className="font-medium title-font items-center -px-4 py-4 flex justify-between"><span>{type}</span><CreateUser type={type} onUpdate={onUpdate}>Create {type}</CreateUser></p>
            <div className="flex flex-wrap -m-2">
                {users !== [] ? users.filter(x => x.group === type.toLowerCase()).map(x =>
                    <div key={x.Username} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <UserButton onClick={toggleButton} isSelected={selectedButton === x} user={x} />
                    </div>
                ) : ""}
            </div>
        </div>
        {
            details ?
                <StudentDetails canEdit onUpdate={onUpdate} details={details} />
                :
                <></>
        }
    </>
}