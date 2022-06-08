import React, { useState } from 'react'

function DynamicField({ field, type, value }) {
    let [valueType, setValueType] = useState(type ? type : "text")

    return (
        <>
            <div>

                <label
                    htmlFor="field"
                    className="block mb-2 text-sm font-medium   "
                >
                    Field
                </label>
                <input
                    type="text"
                    name="field"
                    id="field"
                    defaultValue={field}
                    placeholder=""
                    className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <p className="mx-2">=</p>
            </div>
            <div className='m-2'>
                <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium"
                >
                    Type
                </label>
                <select
                    id="type"
                    name="type"
                    onChange={(event) => { setValueType(event.target.value) }}
                    defaultValue={type}
                    className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                    <option value={"text"}>Text</option>
                    <option value={"list"}>List</option>
                    {/* <option>List</option> */}
                </select>
            </div>
            <div>
                <label
                    htmlFor="value"
                    className="block mb-2 text-sm font-medium"
                >
                    Value
                </label>
                <input
                    type="text"
                    name="value"
                    id="value"
                    defaultValue={value}
                    placeholder={valueType === "text" ? "" : "Seperate by Commas"}
                    className="mt-1 p-1 col-span-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                />
            </div>
        </>
    )
}

export default DynamicField