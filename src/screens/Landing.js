import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';

export default function Landing({ onClick }) {
    const old = false

    // function onSubmit(event) {
    //     event.preventDefault()
    //     const username = event.target.username.value
    //     const password = event.target.password.value
    //     Auth.signIn(username, password).then(user => {
    //         if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    //             Auth.completeNewPassword(
    //                 user,
    //                 password,
    //             ).then(user => {
    //                 console.log(user);
    //             }).catch(e => {
    //                 console.log(e);
    //             });
    //         }
    //     })
    // }

    return old
        ?
        <div className="relative overflow-hidden">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 justify-between">
                <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">Student</span>{' '}
                        <span className="block text-blue-900 xl:inline">Portal</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <button
                                onClick={() => { onClick() }}
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-gray-50 hover:bg-blue-900 hover:text-gray-50 md:py-2 md:text-lg md:px-10"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        :
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 h-screen">
            <div className="mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-8xl m-2">
                    <span className="block">Student</span>
                    <span className="block text-blue-900">Portal</span>
                </h1>
                <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam occaecat fugiat aliqua.
                </p>
            </div>
            <div className="text-left md:px-20 md:py-10 p-5 m-auto">
                <Authenticator hideSignUp />
                {/* <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col justify-center">
                    <h1 className=" text-center font-bold text-3xl text-blue-900">Sign in to your account</h1>
                    <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="font-semibold">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"

                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="font-semibold">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"

                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <button href="#" className="font-medium text-blue-900 hover:text-blue-500">
                                    Forgot your password?
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-blue-900 group-hover:text-white" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div> */}
            </div>
        </div>
}