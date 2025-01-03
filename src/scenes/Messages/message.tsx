import React, { useState } from 'react';
import { SendBirdProvider, ChannelList, Channel } from '@sendbird/uikit-react'; 
import '@sendbird/uikit-react/dist/index.css';

interface AdminDashboardProps {
  appId: string;
  adminId: string;
  accessToken: string | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appId, adminId, accessToken }) => {
  const [selectedChannelUrl, setSelectedChannelUrl] = useState<string | null>(null);
  const [chatType, setChatType] = useState<'group' | 'direct' | null>(null); 


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChatType(event.target.value as 'group' | 'direct');
  };

  return (
    <SendBirdProvider
      appId={appId}
      userId={adminId}
      accessToken={accessToken || undefined}
    >
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Chap panel */}
        <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '1rem' }}>
          <h3>Foydalanuvchi Xabarlari</h3>
          <ChannelList
            onChannelSelect={(channel: any) => {
              if (channel && channel.url) {
                setSelectedChannelUrl(channel.url);
              }
            }}
          />
          <div>
            <select onChange={handleSelectChange} value={chatType || ''} style={{ width: '100%', padding: '8px', marginTop: '10px' }}>
              <option value="" disabled>Select Chat Type</option>
              <option value="group">Group Chat</option>
              <option value="direct">Direct Chat</option>
            </select>
          </div>
        </div>

        <div style={{ width: '70%', padding: '1rem' }}>
          <h3>Chatlar</h3>
          {chatType === 'group' && selectedChannelUrl ? (
            <Channel channelUrl={selectedChannelUrl} />
          ) : chatType === 'direct' ? (
            <div>
              <h4>Admin bilan togrida togri chat
              </h4>
            </div>
          ) : (
            <h3>Please select a chat type and channel</h3>
          )}
        </div>
      </div>
    </SendBirdProvider>
  );
};

export default AdminDashboard;
