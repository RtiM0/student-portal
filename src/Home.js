import { useEffect, useState } from "react";
import { Auth, API } from 'aws-amplify';
import Header from "./header";
import AdminDashBoard from "./AdminDashboard";
import Landing from "./Landing";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";


export default function Home() {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            const cognitoUser = user.signInUserSession.idToken.payload
            Auth.currentUserInfo()
                .then(res => {
                    cognitoUser.attributes = res.attributes;
                    setUser(cognitoUser)
                    setLoading(false)
                })
            API.get("student-portal-api", "/users")
                .then(res => { setUsers(res.users) });
        }).catch((err) => setLoading(false))
    }, [])

    return (
        <header>
            {
                loading ? <>LOADING</>
                    :
                    !user ?
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
                                    <StudentDashboard user={user} />
                            }
                        </div>
            }
        </header>)
}