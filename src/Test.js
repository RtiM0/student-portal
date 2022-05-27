import React, { useEffect } from 'react'

function Test() {
    useEffect(() => {
        console.log("Yello")


    }, [])

    return (
        <div>Test</div>
    )
}

export default Test