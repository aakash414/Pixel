import React, { useState } from 'react';

function Sidebar() {
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
        <MenuDropdown />
      </header>
      <ContactList />
    </div>
  );
}

function MenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className="focus:outline-none" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-2 px-3">
            <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
            <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

function ContactList() {
  return (
    <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
      {/* Contact list items */}
    </div>
  );
}

function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { content: inputValue, isUser: true }]);
      setInputValue('');
    }
  };

  return (
    <div className="flex-1">
      <header className="bg-white p-4 text-gray-700">
        <h1 className="text-2xl font-semibold">Alice</h1>
      </header>
      <div className="h-screen overflow-y-auto p-4 pb-36">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
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
    <div className={message.isUser ? "flex justify-end mb-4 cursor-pointer" : "flex mb-4 cursor-pointer"}>
      <div className={message.isUser ? "flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3" : "flex max-w-96 bg-white rounded-lg p-3 gap-3"}>
        <p>{message.content}</p>
      </div>
      {!message.isUser && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
        </div>
      )}
    </div>
  );
}

function Chat() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default Chat;
