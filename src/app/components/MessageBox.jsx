// "use client"
import { useEffect, useState } from "react";

const MessageBox = ({sender, msg}) => {
    const [isMe, setIsMe] = useState("")
    useEffect(() => {
        let value = localStorage.getItem('loggedName') || ""
        setIsMe(value)
    }, [])

    let classMsg = ""

    if (sender === isMe) {
        classMsg = "self-end bg-blue-500 w-fit px-4 py-2 rounded-s-lg rounded-es-lg my-2"
    } else {
        classMsg = "self-start bg-purple-500 w-fit px-4 py-2 rounded-ss-lg rounded-e-lg my-2"
    }
    return (
        <>
            <div className={classMsg}>
            {/* <div className={(sender == isMe) ? "self-end bg-indigo-500 w-fit px-4 py-2 rounded-ss-lg rounded-e-lg" : "self-end bg-indigo-500 w-fit px-4 py-2 rounded-ss-lg rounded-e-lg" }> */}
                <p className="font-bold text-white">{sender}</p>
                <p className="text-white text-balance font-light">{msg}</p>
            </div>
        </>
    )
}
export default MessageBox