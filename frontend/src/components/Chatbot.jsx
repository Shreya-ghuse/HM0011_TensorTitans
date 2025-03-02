import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const hostname = window.APP_CONFIG?.API_BASE_URL || "http://127.0.0.1:5000";
  console.log("API Base URL:", hostname);

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${hostname}/api/chatbot/history`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(`${hostname}/api/chatbot/chat`, { message: input });
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
        <FaRobot className="mr-2 text-blue-500" /> AI Chatbot
      </h1>

      {/* Chat Display */}
      <div className="h-80 overflow-y-auto border p-4 bg-white rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-center my-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && <FaRobot className="mr-2 text-gray-500" />}
            <span
              className={`px-4 py-2 rounded-lg text-sm max-w-xs break-words ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
            {msg.sender === "user" && <FaUser className="ml-2 text-blue-500" />}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="mt-4 flex items-center">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-r-lg transition duration-200"
          onClick={sendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
