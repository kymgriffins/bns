"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, MessageSquare, Heart, Edit2, Trash2, Reply, MoreVertical, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Comment {
  id: string;
  news_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  content: string;
  parent_id: string | null;
  likes_count: number;
  created_at: string;
  is_edited: boolean;
  replies?: Comment[];
}

interface User {
  id: string;
  email?: string;
}

export function NewsComments({ newsId }: { newsId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [showAllComments, setShowAllComments] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Fetch user
  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, [supabase]);

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?news_id=${newsId}`);
      const result = await response.json();
      if (result.success) {
        // Organize comments into threads
        const rootComments = result.data.filter((c: Comment) => !c.parent_id);
        const replies = result.data.filter((c: Comment) => c.parent_id);
        
        const threadedComments = rootComments.map((comment: Comment) => ({
          ...comment,
          replies: replies.filter((r: Comment) => r.parent_id === comment.id)
        }));
        
        setComments(threadedComments);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  }, [newsId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Subscribe to real-time comments
  useEffect(() => {
    const channel = supabase
      .channel(`comments:${newsId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `news_id=eq.${newsId}`,
        },
        (payload) => {
          // Fetch the new comment with user info
          fetchComments();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "comments",
          filter: `news_id=eq.${newsId}`,
        },
        (payload) => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [newsId, supabase, fetchComments]);

  // Auto-scroll to new comments
  useEffect(() => {
    if (!loading && comments.length > 0) {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments.length, loading]);

  // Submit new comment
  const handleSubmitComment = async () => {
    if (!user) {
      setError("Please sign in to comment");
      return;
    }

    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          news_id: newsId,
          content: newComment,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        return;
      }

      setNewComment("");
      fetchComments();
    } catch (err) {
      setError("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit reply
  const handleSubmitReply = async (parentId: string) => {
    if (!user) {
      setError("Please sign in to reply");
      return;
    }

    if (!replyContent.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          news_id: newsId,
          content: replyContent,
          parent_id: parentId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        return;
      }

      setReplyContent("");
      setReplyingTo(null);
      fetchComments();
    } catch (err) {
      setError("Failed to submit reply");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit comment
  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: commentId,
          content: editContent,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        return;
      }

      setEditingId(null);
      setEditContent("");
      fetchComments();
    } catch (err) {
      setError("Failed to update comment");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        return;
      }

      fetchComments();
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Display comments (limit to 5 initially)
  const displayedComments = showAllComments ? comments : comments.slice(0, 5);
  const hasMoreComments = comments.length > 5;

  return (
    <Card className="mt-8">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Discussion ({comments.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* New comment form */}
        {user ? (
          <div className="mb-6">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.email ? undefined : undefined} />
                <AvatarFallback className="bg-primary/10">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] resize-none"
                  disabled={submitting}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {newComment.length}/5000 characters
                  </span>
                  <Button
                    onClick={handleSubmitComment}
                    disabled={submitting || !newComment.trim()}
                    className="gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-muted-foreground mb-2">
              Sign in to join the discussion
            </p>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        )}

        {/* Comments list */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={user?.id}
                onReply={() => setReplyingTo(comment.id)}
                onEdit={() => {
                  setEditingId(comment.id);
                  setEditContent(comment.content);
                }}
                onDelete={() => handleDeleteComment(comment.id)}
                onSubmitReply={handleSubmitReply}
                onSubmitEdit={handleEditComment}
                replyingTo={replyingTo}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                editingId={editingId}
                editContent={editContent}
                setEditContent={setEditContent}
                submitting={submitting}
                formatRelativeTime={formatRelativeTime}
              />
            ))}
            
            {hasMoreComments && !showAllComments && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowAllComments(true)}
              >
                Show {comments.length - 5} more comments
              </Button>
            )}
            
            <div ref={commentsEndRef} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Comment item component
interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSubmitReply: (parentId: string) => void;
  onSubmitEdit: (commentId: string) => void;
  replyingTo: string | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  editingId: string | null;
  editContent: string;
  setEditContent: (content: string) => void;
  submitting: boolean;
  formatRelativeTime: (date: string) => string;
}

function CommentItem({
  comment,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
  onSubmitReply,
  onSubmitEdit,
  replyingTo,
  replyContent,
  setReplyContent,
  editingId,
  editContent,
  setEditContent,
  submitting,
  formatRelativeTime,
}: CommentItemProps) {
  const isOwner = currentUserId === comment.user_id;
  const isReplying = replyingTo === comment.id;
  const isEditing = editingId === comment.id;

  return (
    <div className={cn("group", comment.parent_id && "ml-8 pl-4 border-l-2 border-muted")}>
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarImage src={comment.user_avatar || undefined} />
          <AvatarFallback className="bg-primary/10 text-xs">
            {comment.user_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{comment.user_name}</span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(comment.created_at)}
            </span>
            {comment.is_edited && (
              <span className="text-xs text-muted-foreground italic">(edited)</span>
            )}
          </div>

          {isEditing ? (
            <div className="mt-2 space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[80px]"
                disabled={submitting}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onSubmitEdit(comment.id)}
                  disabled={submitting}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingId(null);
                    setEditContent("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center gap-4 mt-2">
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Heart className="h-3.5 w-3.5" />
                <span>{comment.likes_count}</span>
              </button>
              
              <button
                onClick={onReply}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Reply className="h-3.5 w-3.5" />
                Reply
              </button>

              {isOwner && (
                <>
                  <button
                    onClick={onEdit}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={onDelete}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </>
              )}
            </div>
          )}

          {/* Reply form */}
          {isReplying && (
            <div className="mt-3 space-y-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[80px]"
                disabled={submitting}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onSubmitReply(comment.id)}
                  disabled={submitting || !replyContent.trim()}
                >
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  onReply={() => {}}
                  onEdit={() => {
                    setEditingId(reply.id);
                    setEditContent(reply.content);
                  }}
                  onDelete={() => {}}
                  onSubmitReply={onSubmitReply}
                  onSubmitEdit={onSubmitEdit}
                  replyingTo={replyingTo}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  editingId={editingId}
                  editContent={editContent}
                  setEditContent={setEditContent}
                  submitting={submitting}
                  formatRelativeTime={formatRelativeTime}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsComments;
