import { useEffect, useState } from "react";
import { Auth, API, Hub } from 'aws-amplify';
import Header from "./header";
import AdminDashBoard from "./AdminDashboard";
import Landing from "./Landing";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";


export default function App() {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    signedIn(data)
                    break
                case 'signOut':
                    setUser(null)
                    break
                default:
                    console.log(event)
                    break
            }
        })
    }, [])

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            signedIn(user)
        }).catch((err) => setLoading(false))
    }, [])

    function signedIn(user) {
        const cognitoUser = user.signInUserSession.idToken.payload
        Auth.currentUserInfo()
            .then(res => {
                cognitoUser.attributes = res.attributes;
                setUser(cognitoUser)
                setLoading(false)
            })
        if (cognitoUser["cognito:groups"][0] !== "student")
            API.get("student-portal-api", "/users")
                .then(res => { setUsers(res.users) });
    }

    return (
        <header>
            {
                loading ? <>LOADING</>
                    :
                    !user ?
                        <Landing onClick={setUser} />
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