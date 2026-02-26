"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, Send, MessageCircle, Users, Zap, 
  CheckCircle2, Wifi, WifiOff, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ChatMessage {
  id: string;
  news_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  content: string;
  created_at: string;
  is_system?: boolean;
}

interface ActiveUser {
  id: string;
  user_name: string;
  user_avatar: string | null;
  joined_at: string;
}

interface LiveDiscussionProps {
  newsId: string;
  newsTitle: string;
}

export function LiveDiscussion({ newsId, newsTitle }: LiveDiscussionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true); // assume connected without realtime
  const [error, setError] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch initial messages and active users
  const fetchData = useCallback(async () => {
    try {
      // Fetch recent chat messages
      const messagesResponse = await fetch(
        `/api/chat/messages?news_id=${newsId}&limit=50`
      );
      const messagesResult = await messagesResponse.json();
      
      if (messagesResult.success) {
        setMessages(messagesResult.data || []);
      }

      // Fetch active users
      const usersResponse = await fetch(
        `/api/chat/active-users?news_id=${newsId}`
      );
      const usersResult = await usersResponse.json();
      
      if (usersResult.success) {
        setActiveUsers(usersResult.data || []);
      }
    } catch (err) {
      console.error("Error fetching chat data:", err);
    } finally {
      setLoading(false);
    }
  }, [newsId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manage active state and polling for active users
  useEffect(() => {
    const markActive = async () => {
      try {
        await fetch("/api/chat/active", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ news_id: newsId }),
        });
      } catch {} // ignore
    };

    markActive();

    const heartbeat = setInterval(markActive, 30000);

    // periodic refresh of active users
    const usersInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/chat/active-users?news_id=${newsId}`);
        const result = await res.json();
        if (result.success) setActiveUsers(result.data || []);
      } catch {}
    }, 30000);

    return () => {
      clearInterval(heartbeat);
      clearInterval(usersInterval);
      // mark inactive
      fetch("/api/chat/inactive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ news_id: newsId }),
      }).catch(() => {});
    };
  }, [newsId]);

  // Auto-scroll to new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Auto-focus input
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          news_id: newsId,
          content: newMessage.trim(),
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "Failed to send message");
        return;
      }

      setNewMessage("");
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full h-12 w-12 p-0 shadow-lg"
          variant="default"
        >
          <MessageCircle className="h-5 w-5" />
          {activeUsers.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-[10px] flex items-center justify-center text-white">
              {activeUsers.length}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-[500px] z-50 shadow-xl flex flex-col">
      {/* Header */}
      <CardHeader className="py-3 px-4 border-b flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-neutral-500" />
              Live Discussion
            </CardTitle>
            {isConnected ? (
              <Badge variant="outline" className="gap-1 text-xs bg-neutral-50 text-neutral-700 border-neutral-200">
                <Wifi className="h-3 w-3" />
                Live
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-xs bg-red-50 text-red-700 border-red-200">
                <WifiOff className="h-3 w-3" />
                Offline
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsMinimized(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Active users */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{activeUsers.length} active</span>
          <div className="flex -space-x-1 ml-auto">
            {activeUsers.slice(0, 5).map((user) => (
              <Avatar key={user.id} className="h-5 w-5 border-2 border-background">
                <AvatarImage src={user.user_avatar || undefined} />
                <AvatarFallback className="text-[10px]">
                  {user.user_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {activeUsers.length > 5 && (
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-muted text-[10px]">
                +{activeUsers.length - 5}
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <MessageCircle className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-xs">No messages yet</p>
            <p className="text-[10px]">Be the first to chat!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.is_system && "justify-center"
                )}
              >
                {!msg.is_system && (
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarImage src={msg.user_avatar || undefined} />
                    <AvatarFallback className="text-[10px]">
                      {msg.user_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("flex-1 min-w-0", msg.is_system && "text-center")}>
                  {!msg.is_system && (
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-medium">{msg.user_name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                  )}
                  <p className={cn(
                    "text-sm break-words",
                    msg.is_system ? "text-muted-foreground italic text-xs" : ""
                  )}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </CardContent>

      {/* Input */}
      <div className="p-3 border-t flex-shrink-0">
        {error && (
          <p className="text-xs text-neutral-500 mb-2">{error}</p>
        )}
        <div className="flex gap-2">
          <Textarea
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[40px] max-h-[100px] resize-none text-sm"
            disabled={sending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={sending || !newMessage.trim()}
            size="icon"
            className="h-10 w-10 flex-shrink-0"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default LiveDiscussion;
