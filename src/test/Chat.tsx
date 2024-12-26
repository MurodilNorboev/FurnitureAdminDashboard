import React, { useState, useEffect } from 'react';
import SendBird from 'sendbird';
import styled from 'styled-components';

const APP_ID = '5D610211-FF7E-476A-9141-569189AD4D9E'; // SendBird App ID
const ADMIN_ID = 'admin_user'; // Admin User ID
const USER_ID = 'user1234'; // Regular User ID
const ADMIN_CHANNEL_URL = 'my_chat_app'; // Admin Channel URL

const sb = new SendBird({ appId: APP_ID });

const ChatContainerWrapper = styled.div`
    display: grid;
  grid-template-areas: "a a";
  border: 1px solid red;
`
;

const ChatContainer = styled.div`
    display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;
  height: 80vh;
  border: 1px solid #ddd;
`
;

const MessageList = styled.div`
    flex: 1;
  overflow-y: auto;
  padding: 10px;
`
;

const InputContainer = styled.div`
    display: flex;
    border-top: 1px solid #ddd;
`
;

const Input = styled.input`
    flex: 1;
  padding: 10px;
  border: none;
  outline: none;
`
;

const Button = styled.button`
    padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`
;

type ChatProps = {
  userType: 'admin' | 'user'; // userType required here
};

const Chat: React.FC<ChatProps> = ({ userType }) => {
  const [messages, setMessages] = useState<SendBird.UserMessage[]>([]);
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState<SendBird.OpenChannel | null>(null);

  const USERNAME = userType === 'admin' ? ADMIN_ID : USER_ID;
  const CHANNEL_URL = userType === 'admin' ? ADMIN_CHANNEL_URL : ADMIN_CHANNEL_URL;

  useEffect(() => {
    sb.connect(USERNAME, (user, error) => {
      if (error) {
        console.error('Connection error:', error);
        return;
      }

      sb.OpenChannel.getChannel(CHANNEL_URL, (openChannel, error) => {
        if (error) {
          console.error('Channel error:', error);
          return;
        }

        openChannel.enter(() => {
          setChannel(openChannel);
          fetchMessages(openChannel);
        });
      });
    });
  }, [userType]);

  const fetchMessages = (openChannel: SendBird.OpenChannel) => {
    const messageParams = new sb.MessageListParams();
    messageParams.prevResultSize = 30; // Limit o'rniga prevResultSize ishlatiladi
    openChannel.getMessagesByTimestamp(Date.now(), messageParams, (msgs, error) => {
      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
      setMessages(msgs as SendBird.UserMessage[]);
    });
  };

  const sendMessage = () => {
    if (!channel || message.trim() === '') return;

    channel.sendUserMessage(message, (msg, error) => {
      if (error) {
        console.error('Error sending message:', error);
        return;
      }
      setMessages((prev) => [...prev, msg]);
      setMessage('');
    });
  };

  return (
    <ChatContainerWrapper>
      <ChatContainer>
        <h2>{userType === 'admin' ? 'Admin Chat' : 'User Chat'}</h2>
        <MessageList>
          {messages.map((msg) => (
            <div key={msg.messageId}>
              {msg.message}
            </div>
          ))}
        </MessageList>
        <InputContainer>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button onClick={sendMessage}>Send</Button>
        </InputContainer>
      </ChatContainer>
    </ChatContainerWrapper>
  );
};

export default Chat;


