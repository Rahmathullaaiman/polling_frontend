import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages, sendChatMessage } from '../services/allapi';

function ChatWorker() {
    const { userId, bookingusername } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState('');
    const [currentUser, setCurrentUser] = useState(null); // State to store current user data
    const [senderUsername, setSenderUsername] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');

    const fetchMessages = async () => {
        try {
            // Get current user ID from session storage or authentication system
            const currentUserData = JSON.parse(sessionStorage.getItem('existworker'));
            setCurrentUser(currentUserData);
            
            // Fetch token from session storage
            const storedToken = sessionStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
    
                // Prepare request headers
                const reqHeader = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`, 
                };
    
                // Fetch messages from the server
                const result = await getMessages(currentUserData._id, userId, reqHeader);
                setMessages(result.data);
                
                // Fetch sender and receiver usernames
                setSenderUsername(currentUserData.name);
                setReceiverUsername(bookingusername); // Assuming workerId is the username of the receiver
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        const senderId = JSON.parse(sessionStorage.getItem('existworker'))._id;
        
        try {
            // Prepare request body and headers
            const reqBody = { senderId: senderId, receiverId: userId, message: message };
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            };
            
            // Send chat message using API
            await sendChatMessage(reqBody, reqHeader);

            // After sending the message, fetch messages again to update the chat
            fetchMessages();

            // Clear the message input field after sending
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <div>
        <h1>Chat with Worker {bookingusername}</h1>
        <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', marginBottom: '10px', overflowY: 'auto' }}>
            {messages && messages.map((msg, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                    <strong>{msg.senderId === currentUser._id ? senderUsername : receiverUsername}: </strong>{msg.message}
                </div>
            ))}
        </div>
        <div style={{ display: 'flex' }}>
            <input type="text" value={message} onChange={handleMessageChange} style={{ flex: '1', marginRight: '10px' }} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    </div>
    );
}

export default ChatWorker;
