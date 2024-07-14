"use client"
import MessageBox from "./components/MessageBox";
import { useEffect, useState } from "react";

import { child, get, getDatabase, onValue, push, ref } from "firebase/database";
import firebaseApp from "./utils/firebase";

const Home = () => {
  // create state loggedName from Local Storage
  const [loggedName, setLoggedName] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])

  const dbRef = getDatabase(firebaseApp)
  const messagesRef = ref(dbRef, "messages/")
  const usersRef = ref(dbRef, "users/")

  useEffect(()=> {
    // to get messages from firebase
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        // Convert Firebase object structure into an array of messages
        const messagesArray = Object.keys(data).map((key) => ({
          id:key, // Assuming each message has unique ID
          sender: data[key].sender,
          message: data[key].message,
        }))
        setMessages(messagesArray);
      }
    })

    // console.log(messages)
  }, [])

  useEffect(() => {
    // let data
    onValue(usersRef, (snapshot) => {
      // data += snapshot.val().name
      const data = snapshot.val()
      if (data) {
        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
        }))
        setUsers(usersArray);
      }
    })
    // setUsers(data)
    // console.log("users", data)
  }, [])
  
  // console.log(messages)
  // let msg =[]
  // messages.forEach(message => {
  //   msg.push(message)
  // })
  // console.log(msg)

  useEffect(()=> {
    // to get Logged username from local storage
    let localUser 
    localUser = localStorage.getItem("loggedName") || "";
    setLoggedName(localUser);
    push(usersRef, {
      name: loggedName,
    })
  }, [])

  // set Name in localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    if (name) {
      localStorage.setItem("loggedName", name);
      setLoggedName(name);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault()
    
    // const newMessageKey = push(child(ref(messagesRef), "messages/")).key
    const newMessageKey = push(messagesRef, {
      sender: loggedName,
      message: messageInput,
    }).key
    console.log("newMessageKey", newMessageKey)

    setMessageInput("")
  }

  const allUsers = users.map(user => user.name).join(", ")

  // variable to save PopUp component
  let PopUp = "";

  if (!loggedName) {
    PopUp = (
      <div className="flex justify-center items-center flex-col h-screen z-10">
        <p>Please enter your name to use this app</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="border-2 border-slate-500 rounded-ss-2xl rounded-e-2xl p-3 text-xl"
            placeholder="Enter your name"
          />
          <button type="submit" className="bg-indigo-500 p-4 rounded-2xl ms-2">Send!</button>
        </form>
      </div>
    );
  }

  return (
    <>
      {PopUp}
      <main className="container mx-auto border-2 flex border-red-500 h-screen box-border">
        <div className="w-full md:flex">
          <div className="px-5 py-3 bg-indigo-700  w-full md:w-auto ">
            <h1 className="text-white text-2xl">Chat Firebase Test</h1>
            <p className="text-white text-pretty">You, {allUsers}.</p>
          </div>
          <div className="px-5 chat-container w-full flex-col border-4 border-green-500 h-5/6 md:h-full relative box-border">
            <div className="overflow-auto flex w-full flex-col h-5/6">
              {messages.map((message) => {
                return (
                  <MessageBox sender={message.sender} msg={message.message}  />
                )
              })}
              {/* <MessageBox sender="Udin bi asep" msg={"Gweh Iam fine"} /> */}
            </div>
            <form onSubmit={handleSendMessage} className="fixed md:absolute bottom-0 w-11/12 py-3 flex justify-between items-center">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="border-2 border-slate-500 rounded-ss-2xl rounded-e-2xl p-3 text-xl flex-1 mr-2 w-auto"
                placeholder="Type your message"
              />
              <button className="bg-indigo-500 p-4 rounded-2xl">Send!</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;





// ======================================================================================================
// import MessageBox from "./components/MessageBox";

// const Home = () => {
//   // if no localStorage(loggedName) then show popUp to ask for name
//   const loggedName = localStorage.getItem("loggedName");
  

//   // if localStorage(loggedName) then show chat interface
//   const handleSubmit = (e) => {
//     localStorage.setItem("loggedName", e.target.value);
//   };

//   let PopUp = ""

//   if (!loggedName) {
//     PopUp = (
//       <div className="flex justify-center items-center flex-col h-screen z-10">
//         <p>Please enter your name to use this app</p>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className="border-2 border-slate-500 rounded-ss-2xl rounded-e-2xl p-3 text-xl"
//             placeholder="Enter your name"
//           />
//           <button className="bg-indigo-500 p-4 rounded-2xl ms-2">Send!</button>
//         </form>
//       </div>
//     );
//   } else {
//     PopUp = ""
//   }

//   return (
//     <>
//       {PopUp}
//       <main className="container mx-auto border-2 flex border-red-500 min-h-screen">
//         <div className="w-full flex">
//           <div className="px-5 py-3 bg-indigo-700">
//             <h1 className="text-white text-2xl">Chat Firebase Test</h1>
//             <p className="text-white text-pretty">You, others...</p>
//           </div>
//           <div className="px-5 chat-container overflow-auto flex w-full flex-col border-4 border-green-500 h-screen relative">
//             <MessageBox sender="Rafai" msg={"helow how ar yu"}  />
//             <MessageBox sender="Udin bi asep" msg={"Gweh Iam fine"} />

//             {/* <div className="absolute bottom-0 w-full px-5 py-3 flex justify-between items-center">
//                <input
//                  type="text"
//                  value={"messageInput"}
//                  onChange={(e) => setMessageInput(e.target.value)}
//                  className="border-2 border-slate-500 rounded-ss-2xl rounded-e-2xl p-3 text-xl flex-1 mr-2"
//                  placeholder="Type your message"
//                />
//                <button className="bg-indigo-500 p-4 rounded-2xl">Send!</button>
//              </div> */}
          
//             <form className="absolute bottom-0 w-full justify-between px-5 py-3 flex items-center">
//               <input
//                 type="text"
//                 className="border-2 border-slate-500 rounded-ss-2xl rounded-e-2xl p-3 text-xl flex-1 mr-2"
//                 placeholder="Type your message"
//               />
//               <button className="bg-indigo-500 p-4 rounded-2xl">Send!</button>
//             </form>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

// export default Home;