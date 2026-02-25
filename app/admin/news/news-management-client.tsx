"use client";

import { useEffect, useState } from "react";
import { getNews, getCategories, fetchAPI } from "@/lib/api";
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
  Search,
  Loader2,
  FileText,
  ExternalLink
} from "lucide-react";
import { useToast, useDangerAlert } from "@/components/feedback";
import { AdminTableSkeleton } from "@/components/loading";

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  cover_image: string | null;
  author_id: string | null;
  category_id: string | null;
  status: "draft" | "published" | "archived" | "review";
  is_featured: boolean;
  reading_time_minutes: number | null;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  source: string | null;
  source_url: string | null;
  category?: Category;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface NewsFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category_id: string;
  status: "draft" | "published" | "archived" | "review";
  is_featured: boolean;
  reading_time_minutes: string;
  seo_title: string;
  seo_description: string;
  source: string;
  source_url: string;
}

const initialFormData: NewsFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category_id: "",
  status: "draft",
  is_featured: false,
  reading_time_minutes: "",
  seo_title: "",
  seo_description: "",
  source: "",
  source_url: "",
};

export default function NewsManagementClient() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState<NewsFormData>(initialFormData);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Feedback hooks
  const { successToast, errorToast } = useToast();
  const confirmDelete = useDangerAlert();

  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await getNews();
      setNewsItems(res.results || []);
    } catch (error) {
      console.error("Error fetching news:", error);
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
      slug: editingNews ? formData.slug : generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const newsData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: JSON.stringify({ html: formData.content, plain: formData.content.replace(/<[^>]*>/g, "") }),
        cover_image: formData.cover_image || null,
        category_id: formData.category_id || null,
        status: formData.status,
        is_featured: formData.is_featured,
        reading_time_minutes: formData.reading_time_minutes ? parseInt(formData.reading_time_minutes) : null,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        source: formData.source || null,
        source_url: formData.source_url || null,
      };

      if (editingNews) {
        await fetchAPI('/api/v1/content/news/', {
          method: 'PUT',
          body: JSON.stringify({ id: editingNews.id, ...newsData }),
        });
        successToast("News updated successfully");
      } else {
        await fetchAPI('/api/v1/content/news/', {
          method: 'POST',
          body: JSON.stringify(newsData),
        });
        successToast("News created successfully");
      }

      setIsDialogOpen(false);
      setEditingNews(null);
      setFormData(initialFormData);
      fetchNews();
      successToast(editingNews ? "News updated successfully" : "News created successfully");
    } catch (error) {
      console.error("Error saving news:", error);
      errorToast("Failed to save news");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt || "",
      content: typeof news.content === 'string' ? news.content : news.content?.html || "",
      cover_image: news.cover_image || "",
      category_id: news.category_id || "",
      status: news.status,
      is_featured: news.is_featured,
      reading_time_minutes: news.reading_time_minutes?.toString() || "",
      seo_title: news.seo_title || "",
      seo_description: news.seo_description || "",
      source: news.source || "",
      source_url: news.source_url || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const newsItem = newsItems.find(n => n.id === id);
    const confirmed = await confirmDelete({
      title: "Delete News Article",
      description: `Are you sure you want to delete "${newsItem?.title || 'this news article'}"? This action cannot be undone.`,
      confirmText: "Delete",
    });
    
    if (!confirmed) return;
    
    setDeleting(id);
    try {
      await fetchAPI(`/api/v1/content/news/?id=${id}`, { method: 'DELETE' });
      fetchNews();
      successToast("News article deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      errorToast("Failed to delete news");
    } finally {
      setDeleting(null);
    }
  };

  const openCreateDialog = () => {
    setEditingNews(null);
    setFormData(initialFormData);
    setIsDialogOpen(true);
  };

  const filteredNews = newsItems.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? "Edit News Article" : "Create New News Article"}
              </DialogTitle>
              <DialogDescription>
                {editingNews 
                  ? "Update the news article details below." 
                  : "Fill in the details to create a new news article."}
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
                    placeholder="Enter news title"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="news-url-slug"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the news article"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="content" className="text-sm font-medium">Content</label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your news content here (supports HTML)"
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

                {/* Source Information */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold mb-3">Source Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="source" className="text-sm font-medium">Source Name</label>
                      <Input
                        id="source"
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        placeholder="e.g., BBC News, Reuters"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="source_url" className="text-sm font-medium">Source URL</label>
                      <Input
                        id="source_url"
                        value={formData.source_url}
                        onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                        placeholder="https://example.com/article"
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold mb-3">SEO Settings</h3>
                  <div className="grid gap-2">
                    <label htmlFor="seo_title" className="text-sm font-medium">SEO Title</label>
                    <Input
                      id="seo_title"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="SEO optimized title (defaults to news title if empty)"
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

                <div className="grid grid-cols-2 gap-4">
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
                  {editingNews ? "Update News" : "Create News"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* News Table */}
      <Card>
        <CardHeader>
          <CardTitle>All News Articles</CardTitle>
          <CardDescription>
            Manage your news content. {filteredNews.length} article(s) found.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <AdminTableSkeleton rows={5} columns={5} showSearch={false} />
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No news articles found.</p>
              <Button variant="link" onClick={openCreateDialog}>
                Create your first news article
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((news) => (
                  <TableRow key={news.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{news.title}</div>
                        <div className="text-sm text-muted-foreground">{news.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {news.category ? (
                        <Badge 
                          style={{ backgroundColor: news.category.color || '#6b7280' }}
                        >
                          {news.category.name}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(news.status)}>
                        {news.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {news.source ? (
                        <a 
                          href={news.source_url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                          {news.source}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {news.is_featured ? (
                        <Badge variant="secondary">Featured</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(news.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(news)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(news.id)}
                          disabled={deleting === news.id}
                        >
                          {deleting === news.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-red-500" />
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
