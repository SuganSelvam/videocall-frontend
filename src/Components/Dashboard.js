import React, { useState } from 'react'

function Dashboard() {

    const [state,setState] = useState()

    navigator.mediaDevices.getUserMedia({video:true}).then(stream => {setState(stream)})

    console.log(state)

    return (
        <div>
            <source id="vid" src={state} type="video/mp4" />
        </div>
    )
}

export default Dashboard
