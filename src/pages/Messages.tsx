
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';
import Layout from '@/components/Layout';
import EmojiPicker from '@/components/EmojiPicker';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  created_at: string;
  listing_id?: string;
}

interface Conversation {
  user_id: string;
  name: string;
  email: string;
  college: string;
  avatar_url?: string;
  last_message?: Message;
  unread_count: number;
}

const Messages = () => {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      fetchConversations();
    }
  }, [user, loading]);

  useEffect(() => {
    if (selectedChat && user) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat, user]);

  const fetchConversations = async () => {
    if (!user) return;

    try {
      // Get all users who have messaged with current user
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .select('sender_id, receiver_id')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

      if (messageError) throw messageError;

      // Get unique user IDs
      const userIds = new Set<string>();
      messageData?.forEach(msg => {
        if (msg.sender_id !== user.id) userIds.add(msg.sender_id);
        if (msg.receiver_id !== user.id) userIds.add(msg.receiver_id);
      });

      if (userIds.size === 0) {
        setConversations([]);
        setLoadingMessages(false);
        return;
      }

      // Fetch profiles for these users
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, name, email, college, avatar_url')
        .in('user_id', Array.from(userIds));

      if (profileError) throw profileError;

      // Get last message for each conversation
      const conversationsWithMessages = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('*')
            .or(`and(sender_id.eq.${user.id},receiver_id.eq.${profile.user_id}),and(sender_id.eq.${profile.user_id},receiver_id.eq.${user.id})`)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            user_id: profile.user_id,
            name: profile.name,
            email: profile.email,
            college: profile.college,
            avatar_url: profile.avatar_url,
            last_message: lastMessage,
            unread_count: 0
          };
        })
      );

      setConversations(conversationsWithMessages);
      if (conversationsWithMessages.length > 0 && !selectedChat) {
        setSelectedChat(conversationsWithMessages[0].user_id);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchMessages = async (otherUserId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedChat,
          text: newMessage
        });

      if (error) throw error;

      // Refresh messages
      await fetchMessages(selectedChat);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const selectedUser = conversations.find(c => c.user_id === selectedChat);

  if (loading || loadingMessages) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500">Loading messages...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
                      key={conv.user_id}
                      onClick={() => setSelectedChat(conv.user_id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedChat === conv.user_id ? 'bg-[#6C63FF]/10 border-r-2 border-[#6C63FF]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conv.avatar_url} alt={conv.name} />
                          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-[#1A1A1A]">
                            {conv.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {conv.last_message?.text || 'No messages yet'}
                          </div>
                        </div>
                        {conv.unread_count > 0 && (
                          <Badge className="bg-[#00BFA6] text-white text-xs">
                            {conv.unread_count}
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
                        <AvatarImage src={selectedUser.avatar_url} alt={selectedUser.name} />
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
                      {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <div className="text-center">
                            <div className="text-4xl mb-2">💬</div>
                            <p>No messages yet</p>
                            <p className="text-sm">Start the conversation!</p>
                          </div>
                        </div>
                      ) : (
                        messages.map(message => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender_id === user?.id
                                  ? 'bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] text-white'
                                  : 'bg-gray-100 text-[#1A1A1A]'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender_id === user?.id ? 'text-white/70' : 'text-gray-500'
                              }`}>
                                {new Date(message.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-100 p-4">
                      <div className="flex space-x-2">
                        <div className="flex-1 flex">
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                            className="flex-1 border-gray-200 focus:border-[#6C63FF] rounded-r-none"
                          />
                          <div className="border border-l-0 border-gray-200 rounded-r-md flex items-center px-2">
                            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                          </div>
                        </div>
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white px-3"
                        >
                          <Send className="h-4 w-4" />
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
