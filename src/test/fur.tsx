import React, { useState } from 'react';
import { SendBirdProvider, ChannelList, Channel } from '@sendbird/uikit-react'; 
import '@sendbird/uikit-react/dist/index.css';
import { baseAPI } from '../utils/constants';

const FurnitureChat: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedChannelUrl, setSelectedChannelUrl] = useState<string | null>(null);

  const handleLogin = async (username: string): Promise<void> => {
    try {
      const response = await fetch(`${baseAPI}/product/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username }),
      });

      const data = await response.json();
      if (data.success) {
        setUserId(data.data.userId);
        setAccessToken(data.data.accessToken);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (!userId) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Furniture Chat</h2>
        <input
          type="text"
          placeholder="Enter username"
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            handleLogin((e.target as HTMLInputElement).value)
          }
          style={{
            padding: '10px',
            fontSize: '16px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      </div>
    );
  }

  return (
    <SendBirdProvider
      appId="894E1E6C-8871-47A1-935D-B9B0BDB46A25" 
      userId={userId}
      accessToken={accessToken || undefined}
    >
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '1rem' }}>
          <h3>Channels</h3>
          <ChannelList
            onChannelSelect={(channel: any) => {
              if (channel && channel.url) {
                setSelectedChannelUrl(channel.url);
              }
            }}
          />
        </div>
        <div style={{ width: '70%', padding: '1rem' }}>
          {selectedChannelUrl ? (
            <Channel channelUrl={selectedChannelUrl} />
          ) : (
            <h3>Please select a channel to start chatting</h3>
          )}
        </div>
      </div>
    </SendBirdProvider>
  );
};

export default FurnitureChat;

