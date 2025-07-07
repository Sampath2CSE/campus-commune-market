
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { mockMessages, mockUsers } from '@/data/mockData';
import { Message } from '@/types';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useEffect(() => {
    // Filter messages for current user
    const userMessages = mockMessages.filter(
      msg => msg.senderId === user?.id || msg.receiverId === user?.id
    );
    setMessages(userMessages);
    
    // Auto-select first chat if available
    if (userMessages.length > 0) {
      const otherUserId = userMessages[0].senderId === user?.id 
        ? userMessages[0].receiverId 
        : userMessages[0].senderId;
      setSelectedChat(otherUserId);
    }
  }, [user]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: selectedChat,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  // Get unique conversations
  const conversations = messages.reduce((acc, msg) => {
    const otherUserId = msg.senderId === user?.id ? msg.receiverId : msg.senderId;
    if (!acc.find(c => c.userId === otherUserId)) {
      const otherUser = mockUsers.find(u => u.id === otherUserId);
      const lastMessage = messages
        .filter(m => (m.senderId === otherUserId && m.receiverId === user?.id) || 
                    (m.senderId === user?.id && m.receiverId === otherUserId))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      
      if (otherUser) {
        acc.push({
          userId: otherUserId,
          user: otherUser,
          lastMessage,
          unreadCount: 0
        });
      }
    }
    return acc;
  }, [] as any[]);

  const selectedChatMessages = messages.filter(
    msg => (msg.senderId === user?.id && msg.receiverId === selectedChat) ||
           (msg.senderId === selectedChat && msg.receiverId === user?.id)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const selectedUser = mockUsers.find(u => u.id === selectedChat);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Messages</h1>
        
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="text-4xl mb-2">💬</div>
                    <p>No messages yet</p>
                    <p className="text-sm">Start by messaging a seller!</p>
                  </div>
                ) : (
                  conversations.map(conv => (
                    <button
                      key={conv.userId}
                      onClick={() => setSelectedChat(conv.userId)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedChat === conv.userId ? 'bg-[#6C63FF]/10 border-r-2 border-[#6C63FF]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                          <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-[#1A1A1A]">
                            {conv.user.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {conv.lastMessage?.text || 'No messages yet'}
                          </div>
                        </div>
                        {conv.unreadCount > 0 && (
                          <Badge className="bg-[#00BFA6] text-white text-xs">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full flex flex-col">
              {selectedUser ? (
                <>
                  <CardHeader className="border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-[#1A1A1A]">
                          {selectedUser.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedUser.college}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedChatMessages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderId === user?.id
                                ? 'bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] text-white'
                                : 'bg-gray-100 text-[#1A1A1A]'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.senderId === user?.id ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-100 p-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1 border-gray-200 focus:border-[#6C63FF]"
                        />
                        <Button
                          onClick={sendMessage}
                          className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-lg">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
