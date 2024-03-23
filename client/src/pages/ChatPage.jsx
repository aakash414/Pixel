import React, { useEffect, useState } from "react";
import userspic from "../assets/userspic.svg";
import { app, db } from "../firebase/Firebase";
import {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";

function Sidebar({ activeUser, setActiveUser }) {
  return (
    <div className="w-1/4 bg-gray-50 border-r border-gray-300">
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-primary text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
        {/* <MenuDropdown /> */}
      </header>
      <ContactList setActiveUser={setActiveUser} />
    </div>
  );
}

function ContactList({ setActiveUser }) {
  const [roomNames, setRoomNames] = useState([]);

  useEffect(() => {
    async function fetchDocumentData() {
      const q = query(collection(db, "chat"));
      const querySnapshot = await getDocs(q);
      const rooms = querySnapshot.docs.map((doc) => doc.data().roomName);
      setRoomNames(rooms);
    }

    fetchDocumentData();
  }, []);

  function handleUserClick(room) {
    setActiveUser(room);
  }

  return (
    <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
      {roomNames.map((room, index) => (
        <div
          key={index}
          className={`flex items-center mb-4 cursor-pointer p-2 rounded-md `}
          onClick={() => handleUserClick(room)}
        >
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
          <img src={userspic} alt="userspic" className="h-12 w-12 text-gray-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{room}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatArea({ activeUser }) {
  const [messages, setMessages] = useState(null);
  const [inputValue, setInputValue] = useState("");
  let blah = true;
  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      // Create a new message object with user ID (replace "123" with actual user ID)
      const walletid = localStorage.getItem("walletAddress");
      console.log("walletAddress", walletid);
      const message = {
        message: inputValue,
        user: walletid,
        time: new Date().toLocaleTimeString(),
      };

      console.log(message, "messages"); // For debugging

      try {
        // Add the message to Firestore using collection reference
        console.log(activeUser, "activeusre");
        const messageRef = collection(db, "chat", activeUser, "messages");
        await addDoc(messageRef, message);
        blah = false;
        // Clear the input field
        setInputValue("");
      } catch (error) {
        console.error("Error adding message:", error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    }
  };
  useEffect(() => {
    async function fetchMessages() {
      const q = query(collection(db, "chat", activeUser, "messages"));
      const querySnapshot = await getDocs(q);
      const messageRes = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messageRes);
    }

    fetchMessages();
    console.log(messages, "messages");

    // Cleanup function to unsubscribe from real-time updates (optional)
    return () => {
      // Unsubscribe from any real-time listeners here
    };
  }, [activeUser, blah]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1">
      <header className="bg-white p-4 text-gray-700">
        <h1 className="text-2xl font-semibold">{activeUser}</h1>
      </header>
      <div className="h-screen overflow-y-auto p-4 pb-36 bg-white">
        {!messages ? (
          <p className="text-center">No messages yet...</p>
        ) : (
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        )}
      </div>
      <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded-xl border border-gray-400 focus:outline-none focus:border-primary"
            onKeyPress={handleKeyPress}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-xl ml-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

function Message({ message }) {
  return (
    <div
      className={
        message.isUser
          ? "flex justify-end mb-4 cursor-pointer"
          : "flex mb-4 cursor-pointer"
      }
    >
      <div
        className={
          message.isUser
            ? "flex max-w-96 bg-indigo-500  text-white rounded-lg p-3 gap-3"
            : "bg-blue-300 px-4 py-2 rounded-lg"
        }
      >
        <p className="">{message.message}</p>
        <p className="text-indigo-600 text-xs">{message.user}</p>
      </div>
    </div>
  );
}

function Chat() {
  const [activeUser, setActiveUser] = useState(null);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeUser={activeUser} setActiveUser={setActiveUser} />
      <ChatArea activeUser={activeUser} />
    </div>
  );
}

export default Chat;
