import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';
import Icon from '../AppIcon';

// Get the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef(null); // Ref for the chat model's history

  // Initialize the Generative AI model
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Function to initialize the chat session
  const initializeChat = () => {
    // Start a new chat session with an empty history
    chatHistoryRef.current = model.startChat({
        history: [], // The history starts empty
        generationConfig: {
            maxOutputTokens: 200,
        },
    });
  };
  
  useEffect(() => {
    if (isOpen) {
      initializeChat();
      // Greet the user and offer help
      setMessages([
        {
          text: 'Hello! I am the DHR Kerala Assistant. How can I help you today?',
          sender: 'bot'
        }
      ]);
    }
  }, [isOpen]);

  // Scroll to the latest message
  useEffect(() => {
    const messageContainer = document.querySelector('.chatbot-messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);


  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!chatHistoryRef.current) {
        initializeChat();
      }
      
      // We can add a simple system prompt here before sending the message
      const prompt = `You are an assistant for the DHR Kerala application. Please answer the following question: "${inputValue}"`;

      const result = await chatHistoryRef.current.sendMessage(prompt);
      const response = result.response;
      const text = response.text();

      setMessages(prevMessages => [...prevMessages, { text, sender: 'bot' }]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Sorry, something went wrong. Please try again.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <Icon name={isOpen ? 'X' : 'MessageSquare'} size={24} color="white" />
      </button>
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h2>DHR Kerala Assistant</h2>
            <button onClick={toggleChatbot}><Icon name="X" size={16} /></button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {/* Basic markdown for bolding and new lines */}
                {msg.text.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                ).flatMap(part => typeof part === 'string' ? part.split('\n').map((line, j) => <p key={`${j}`} style={{margin: 0}}>{line}</p>) : [part])}
              </div>
            ))}
            {isLoading && (
              <div className="message bot typing-indicator">
                <span></span><span></span><span></span>
              </div>
            )}
          </div>
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
              disabled={isLoading}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
            />
            <button type="submit" disabled={isLoading}><Icon name="Send" size={18} /></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;