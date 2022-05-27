import { useEffect, useState } from "react";
import { Auth, API } from 'aws-amplify';
import Header from "./header";
import AdminDashBoard from "./AdminDashboard";
import Landing from "./Landing";
import UsersSection from "./UsersSection";
import FacultyDashboard from "./FacultyDashboard";


export default function Home() {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [student, setStudent] = useState(null)

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            const cognitoUser = user.signInUserSession.idToken.payload
            Auth.currentUserInfo()
                .then(res => {
                    cognitoUser.attributes = res.attributes;
                    setUser(cognitoUser)
                })
            API.get("student-portal-api", "/users")
                .then(res => { setUsers(res.users) });

            if (cognitoUser["cognito:groups"][0] === "student") {
                API.get("student-portal-api", `/students/${cognitoUser["cognito:username"]}`)
                    .then(res => {
                        console.log(res);
                        setStudent(res);
                    });
            }
        }).catch((err) => { console.log(err) })
    }, [])

    function handleSubmitStudent(event) {
        event.preventDefault()
        const init = {
            body: {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                type: "student",
                departmentNo: event.target.department.value,
                classNo: event.target.className.value
            }
        }
        API.post("student-portal-api", "/createuser", init)
            .then(res => console.log(res))
    }

    function handleUpdateStudent(event) {
        event.preventDefault()
        const init = {
            body: {
                username: event.target.username.value,
                detail: JSON.parse(event.target.details.value)
            }
        }
        API.post("student-portal-api", "/updatestudent", init)
            .then(res => console.log(res))
    }

    const createStudent = () => {
        return (<div className="bg-black">
            <p>Create Student</p>
            <form onSubmit={handleSubmitStudent}>
                <label>
                    username:
                    <input className="bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="text" name="username" />
                </label>
                <br />
                <label>
                    email:
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <label>
                    Department No:
                    <input type="number" name="department" />
                </label>
                <br />
                <label>
                    Class No:
                    <input type="number" name="className" />
                </label>
                <br />
                <input type="submit" />
            </form>
        </div>)
    }

    const updateStudent = () => {
        return (<div style={{ backgroundColor: "black" }}>
            <p>Update Student</p>
            <form onSubmit={handleUpdateStudent}>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Details:
                    <input className="bg-gray-800" type="text" name="details" />
                </label>
                <br />
                <input type="submit" />
            </form>
        </div>)
    }

    return (
        <header>
            {!user ?
                <Landing onClick={() => Auth.federatedSignIn()} />
                :
                <div>
                    <Header onClick={() => Auth.signOut()} />
                    {
                        user["cognito:groups"][0] !== "student" ?
                            <>
                                {user["cognito:groups"][0] === "superadmin"
                                    ?
                                    <>
                                        <AdminDashBoard user={user} users={users} />
                                    </>
                                    :
                                    <>
                                        <FacultyDashboard user={user} users={users} />
                                    </>}
                            </>
                            :
                            student ?
                                <div>
                                    <p>Department No. : {user["attributes"]["custom:departmentNo"]}</p>
                                    <p>Class No. : {user["attributes"]["custom:classNo"]}</p>
                                    <p></p>
                                </div> : ""
                    }
                </div>
            }
        </header>)
}