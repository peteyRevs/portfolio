'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Message, Project } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { MessageSquare, Send, Paperclip, User } from 'lucide-react';

interface MessagesTabProps {
  messages: Message[];
  projects: Project[];
  currentUserId: string;
}

export default function MessagesTab({ messages: initialMessages, projects, currentUserId }: MessagesTabProps) {
  const router = useRouter();
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<string | null>(
    projects[0]?.id || null
  );
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [sending, setSending] = useState(false);

  // Filter messages by selected project
  const projectMessages = messages
    .filter((msg) => msg.project_id === selectedProject)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  // Get selected project details
  const currentProject = projects.find((p) => p.id === selectedProject);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [projectMessages]);

  // Real-time subscription for new messages
  useEffect(() => {
    if (!selectedProject) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `project_id=eq.${selectedProject}`
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `project_id=eq.${selectedProject}`
        },
        (payload) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === payload.new.id ? (payload.new as Message) : msg))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedProject, supabase]);

  // Mark messages as read when viewing a project
  useEffect(() => {
    if (!selectedProject) return;

    const markAsRead = async () => {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('project_id', selectedProject)
        .neq('sender_id', currentUserId)
        .eq('is_read', false);
    };

    markAsRead();
  }, [selectedProject, currentUserId, supabase]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedProject || sending) return;

    setSending(true);

    try {
      const { error } = await supabase.from('messages').insert({
        project_id: selectedProject,
        sender_id: currentUserId,
        message: newMessage.trim(),
        attachments: [],
        is_read: false,
      });

      if (error) throw error;

      setNewMessage('');
      router.refresh(); // Refresh to update server component data
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-slate-300">Communicate with your project team</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <MessageSquare className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No projects yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Messages will appear here once you have projects
          </p>
        </div>
      ) : (
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Project Sidebar */}
          <div className="w-64 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">Projects</h3>
            <div className="space-y-2">
              {projects.map((project) => {
                const projectMessageCount = messages.filter(
                  (m) => m.project_id === project.id
                ).length;
                const unreadCount = messages.filter(
                  (m) => m.project_id === project.id && !m.is_read && m.sender_id !== currentUserId
                ).length;

                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedProject === project.id
                        ? 'bg-blue-500/20 text-white border border-blue-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{project.project_name}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {projectMessageCount} message{projectMessageCount !== 1 ? 's' : ''}
                        </div>
                      </div>
                      {unreadCount > 0 && (
                        <span className="flex-shrink-0 ml-2 px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 min-w-0">
            {/* Chat Header */}
            {currentProject && (
              <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">{currentProject.project_name}</h2>
                {currentProject.description && (
                  <p className="text-sm text-slate-400">{currentProject.description}</p>
                )}
              </div>
            )}

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {projectMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400">No messages yet</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Start a conversation with your team
                    </p>
                  </div>
                </div>
              ) : (
                projectMessages.map((message) => {
                  const isOwnMessage = message.sender_id === currentUserId;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          isOwnMessage
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/10 text-slate-100'
                        }`}
                      >
                        {!isOwnMessage && (
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4" />
                            <span className="text-xs font-semibold text-slate-300">
                              Team Member
                            </span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.message}
                        </p>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, idx) => (
                              <a
                                key={idx}
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs hover:underline"
                              >
                                <Paperclip className="w-3 h-3" />
                                {attachment.name}
                              </a>
                            ))}
                          </div>
                        )}
                        <div
                          className={`text-xs mt-2 ${
                            isOwnMessage ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {new Date(message.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button className="p-3 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className={`w-5 h-5 ${sending ? 'animate-pulse' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
