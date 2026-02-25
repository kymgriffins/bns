"use client";

import { useEffect, useState } from "react";
import { getBlogPosts, getCategories, fetchAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  Search,
  Loader2,
  FileText,
  X
} from "lucide-react";
import { useToast, useDangerAlert } from "@/components/feedback";
import { AdminTableSkeleton } from "@/components/loading";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  cover_image: string | null;
  author_id: string | null;
  category_id: string | null;
  status: "draft" | "published" | "archived" | "review";
  is_premium: boolean;
  is_featured: boolean;
  reading_time_minutes: number | null;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  category?: Category;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category_id: string;
  status: "draft" | "published" | "archived" | "review";
  is_premium: boolean;
  is_featured: boolean;
  reading_time_minutes: string;
  seo_title: string;
  seo_description: string;
}

const initialFormData: BlogFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category_id: "",
  status: "draft",
  is_premium: false,
  is_featured: false,
  reading_time_minutes: "",
  seo_title: "",
  seo_description: "",
};

export default function BlogManagementClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Feedback hooks
  const { successToast, errorToast } = useToast();
  const confirmDelete = useDangerAlert();

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getBlogPosts();
      setBlogs(res.results || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingBlog ? formData.slug : generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const blogData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: JSON.stringify({ html: formData.content, plain: formData.content.replace(/<[^>]*>/g, "") }),
        cover_image: formData.cover_image || null,
        category_id: formData.category_id || null,
        status: formData.status,
        is_premium: formData.is_premium,
        is_featured: formData.is_featured,
        reading_time_minutes: formData.reading_time_minutes ? parseInt(formData.reading_time_minutes) : null,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
      };

      if (editingBlog) {
        await fetchAPI('/api/blogs', {
          method: 'PUT',
          body: JSON.stringify({ id: editingBlog.id, ...blogData }),
        });
        successToast("Blog updated successfully");
      } else {
        await fetchAPI('/api/blogs', {
          method: 'POST',
          body: JSON.stringify(blogData),
        });
        successToast("Blog created successfully");
      }

      setIsDialogOpen(false);
      setEditingBlog(null);
      setFormData(initialFormData);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      errorToast("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: typeof blog.content === 'string' ? blog.content : blog.content?.html || "",
      cover_image: blog.cover_image || "",
      category_id: blog.category_id || "",
      status: blog.status,
      is_premium: blog.is_premium,
      is_featured: blog.is_featured,
      reading_time_minutes: blog.reading_time_minutes?.toString() || "",
      seo_title: blog.seo_title || "",
      seo_description: blog.seo_description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const blogItem = blogs.find(b => b.id === id);
    const confirmed = await confirmDelete({
      title: "Delete Blog Post",
      description: `Are you sure you want to delete "${blogItem?.title || 'this blog post'}"? This action cannot be undone.`,
      confirmText: "Delete",
    });
    
    if (!confirmed) return;
    
    setDeleting(id);
    try {
      await fetchAPI(`/api/blogs?id=${id}`, { method: 'DELETE' });
      fetchBlogs();
      successToast("Blog post deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      errorToast("Failed to delete blog");
    } finally {
      setDeleting(null);
    }
  };

  const openCreateDialog = () => {
    setEditingBlog(null);
    setFormData(initialFormData);
    setIsDialogOpen(true);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-gray-500";
      case "review":
        return "bg-yellow-500";
      case "archived":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </DialogTitle>
              <DialogDescription>
                {editingBlog 
                  ? "Update the blog post details below." 
                  : "Fill in the details to create a new blog post."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="blog-url-slug"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the blog post"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="content" className="text-sm font-medium">Content</label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog content here (supports HTML)"
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="cover_image" className="text-sm font-medium">Cover Image URL</label>
                  <Input
                    id="cover_image"
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold mb-3">SEO Settings</h3>
                  <div className="grid gap-2">
                    <label htmlFor="seo_title" className="text-sm font-medium">SEO Title</label>
                    <Input
                      id="seo_title"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="SEO optimized title (defaults to blog title if empty)"
                    />
                  </div>
                  <div className="grid gap-2 mt-3">
                    <label htmlFor="seo_description" className="text-sm font-medium">SEO Description</label>
                    <Textarea
                      id="seo_description"
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      placeholder="SEO meta description for search engines"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "draft" | "published" | "archived" | "review") => 
                        setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="reading_time" className="text-sm font-medium">Reading Time (min)</label>
                    <Input
                      id="reading_time"
                      type="number"
                      min="1"
                      value={formData.reading_time_minutes}
                      onChange={(e) => setFormData({ ...formData, reading_time_minutes: e.target.value })}
                      placeholder="5"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="is_premium"
                      checked={formData.is_premium}
                      onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <label htmlFor="is_premium" className="text-sm font-medium">Premium Content</label>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <label htmlFor="is_featured" className="text-sm font-medium">Featured</label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blog List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Blog Posts
          </CardTitle>
          <CardDescription>
            {filteredBlogs.length} blog post{filteredBlogs.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <AdminTableSkeleton rows={5} columns={5} showSearch={false} />
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No blogs found. Create your first blog post!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{blog.title}</span>
                        {blog.excerpt && (
                          <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                            {blog.excerpt}
                          </span>
                        )}
                        <div className="flex gap-1 mt-1">
                          {blog.is_featured && (
                            <Badge variant="secondary" className="text-xs">Featured</Badge>
                          )}
                          {blog.is_premium && (
                            <Badge variant="secondary" className="text-xs">Premium</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {blog.category ? (
                        <Badge 
                          style={{ backgroundColor: blog.category.color + "20", color: blog.category.color }}
                        >
                          {blog.category.name}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(blog.status)}>
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{blog.view_count.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(blog)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(blog.id)}
                          disabled={deleting === blog.id}
                        >
                          {deleting === blog.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-destructive" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
