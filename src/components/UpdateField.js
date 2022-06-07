import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { API } from 'aws-amplify'

export default function UpdateField({ username, name, detail, onUpdate }) {
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
                username,
                detail: {}
            }
        }
        var value
        try {
            value = JSON.parse(event.target.value.value)
        } catch (_) {
            value = event.target.value.value
        }
        init.body.detail[event.target.title.value] = value
        API.post("student-portal-api", "/updatestudent", init)
            .then(res => console.log(res))
        onUpdate()
        closeModal()
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="bg-blue-100 text-blue-900 px-5 p-1 rounded font-semibold cursor-pointer hover:bg-blue-200 mr-2"
            >
                Edit
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
                                        className="text-lg capitalize font-medium leading-6 text-gray-900"
                                    >
                                        update {name}
                                    </Dialog.Title>
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                        <div className="mt-2">
                                            <div className='grid grid-cols-3 gap-1'>
                                                <label htmlFor="username" className="block p-2 text-sm font-medium text-gray-700">
                                                    Title
                                                </label>
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    defaultValue={name}
                                                    required
                                                    className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <label htmlFor="email-address" className="block p-2 text-sm font-medium text-gray-700">
                                                    Value
                                                </label>
                                                <textarea
                                                    id="value"
                                                    name="value"
                                                    type="text"
                                                    defaultValue={JSON.stringify(detail)}
                                                    required
                                                    className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-center">
                                            <input
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                value="Update Field"
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
