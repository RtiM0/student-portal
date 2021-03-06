import UsersSection from '../components/UsersSection';
import { BriefcaseIcon, InboxIcon } from '@heroicons/react/solid'

export default function FacultyDashboard({ user, users }) {
    return <>
        <div className="lg:flex lg:items-center lg:justify-between text-left mx-5 px-5 rounded-md shadow py-2 capitalize bg-gray-50">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{user["cognito:username"]}</h2>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {user["cognito:groups"]}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 lowercase">
                        <InboxIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {user["attributes"]["email"]}
                    </div>
                </div>
            </div>
        </div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 mx-auto mt-5">
                {/* <div className="flex flex-col text-center w-full mb-10">
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
                </div> */}
                <UsersSection users={users} type="Faculty" />
                <UsersSection users={users} type="Student" />
            </div>
        </section>
    </>
}