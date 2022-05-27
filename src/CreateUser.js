import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { API } from 'aws-amplify'

export default function CreateUser({ children, type }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function handleSubmitFaculty(event) {
        event.preventDefault()
        const init = {
            body: {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                type: type.toLowerCase()
            }
        }
        API.post("student-portal-api", "/createuser", init)
            .then(res => console.log(res))
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
                {children}
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create {type}
                                    </Dialog.Title>
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmitFaculty}>
                                        <div className="mt-2">
                                            <div className='grid grid-cols-3 gap-1'>
                                                <label htmlFor="username" className="block p-2 text-sm font-medium text-gray-700">
                                                    Username
                                                </label>
                                                <input
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    autoComplete="username"
                                                    required
                                                    className="mt-1 p-1 col-span-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <label htmlFor="email-address" className="block p-2 text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    id="email-address"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    className="mt-1 p-1 col-span-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <label htmlFor="password" className="block p-2 text-sm font-medium text-gray-700">
                                                    Password
                                                </label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    className="mt-1 col-span-2 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            {/* <div>
                                                <button
                                                    type="submit"
                                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                    </span>
                                                    Sign in
                                                </button>
                                            </div> */}
                                        </div>

                                        <div className="mt-4 flex justify-center">
                                            <input
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                                value={`Create ${type}`}
                                            />
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
