import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { API } from 'aws-amplify'

export default function CreateUser({ children, type, onUpdate }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const init = {
            body: {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                type: type.toLowerCase(),

            }
        }
        if (type === "Student") {
            init.body["departmentNo"] = event.target.department.value
            init.body["classNo"] = event.target.class.value
        }
        API.post("student-portal-api", "/createuser", init)
            .then(res => console.log(res))
        onUpdate()
        closeModal()
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="py-2 px-4 border border-transparent font-medium rounded-md bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                                                    className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                                    className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                {
                                                    type === "Student" ?
                                                        <>
                                                            <label htmlFor="departmentNo" className="block p-2 text-sm font-medium text-gray-700">
                                                                Department No
                                                            </label>
                                                            <input
                                                                id="departmentNo"
                                                                name="department"
                                                                type="number"
                                                                required
                                                                className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            />
                                                            <label htmlFor="classNo" className="block p-2 text-sm font-medium text-gray-700">
                                                                Class No
                                                            </label>
                                                            <input
                                                                id="classNo"
                                                                name="class"
                                                                type="number"
                                                                required
                                                                className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            />
                                                        </>
                                                        :
                                                        <></>
                                                }
                                                <label htmlFor="password" className="block p-2 text-sm font-medium text-gray-700">
                                                    Password
                                                </label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    className="mt-1 col-span-2 p-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-center">
                                            <input
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
