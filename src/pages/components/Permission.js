import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Permission() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => { navigate("/") }, 3000)
    })
    return (
        <div>尚未同意email</div>
    )
}

export default Permission