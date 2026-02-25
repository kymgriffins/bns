"use client";

import { useEffect, useState } from "react";
import { getCategories, fetchAPI } from "@/lib/api";
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
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Loader2,
  Folder
} from "lucide-react";
import { useToast, useDangerAlert } from "@/components/feedback";
import { AdminTableSkeleton } from "@/components/loading";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  icon: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  sort_order: string;
  is_active: boolean;
}

const initialFormData: CategoryFormData = {
  name: "",
  slug: "",
  description: "",
  color: "#E53935",
  icon: "",
  sort_order: "0",
  is_active: true,
};

const colorOptions = [
  "#E53935", // Red
  "#D81B60", // Pink
  "#8E24AA", // Purple
  "#5D4037", // Brown
  "#1E88E5", // Blue
  "#00ACC1", // Cyan
  "#43A047", // Green
  "#FB8C00", // Orange
  "#F4511E", // Deep Orange
  "#3949AB", // Indigo
];

export default function CategoryManagementClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Feedback hooks
  const { successToast, errorToast } = useToast();
  const confirmDelete = useDangerAlert();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(cats || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: editingCategory ? formData.slug : generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const categoryData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        color: formData.color,
        icon: formData.icon || null,
        sort_order: formData.sort_order ? parseInt(formData.sort_order) : 0,
        is_active: formData.is_active,
      };

      if (editingCategory) {
        await fetchAPI('/api/categories', {
          method: 'PUT',
          body: JSON.stringify({ id: editingCategory.id, ...categoryData }),
        });
        successToast("Category updated successfully");
      } else {
        await fetchAPI('/api/categories', {
          method: 'POST',
          body: JSON.stringify(categoryData),
        });
        successToast("Category created successfully");
      }

      setIsDialogOpen(false);
      setEditingCategory(null);
      setFormData(initialFormData);
      fetchCategories();
      successToast(editingCategory ? "Category updated successfully" : "Category created successfully");
    } catch (error: any) {
      console.error("Error saving category:", error);
      errorToast("Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      color: category.color,
      icon: category.icon || "",
      sort_order: category.sort_order?.toString() || "0",
      is_active: category.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const categoryItem = categories.find(c => c.id === id);
    const confirmed = await confirmDelete({
      title: "Delete Category",
      description: `Are you sure you want to delete "${categoryItem?.name || 'this category'}"? This action cannot be undone.`,
      confirmText: "Delete",
    });
    
    if (!confirmed) return;
    
    setDeleting(id);
    try {
      await fetchAPI(`/api/categories?id=${id}`, { method: 'DELETE' });
      fetchCategories();
      successToast("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      errorToast("Failed to delete category. It may have items assigned to it.");
    } finally {
      setDeleting(null);
    }
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setFormData(initialFormData);
    setIsDialogOpen(true);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Create New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory 
                  ? "Update the category details below." 
                  : "Fill in the details to create a new category."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Category name"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="category-slug"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the category"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          formData.color === color ? "border-black scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <Input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-8 h-8 p-0 border-0"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="icon" className="text-sm font-medium">Icon (Lucide name)</label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., newspaper, cpu, trophy"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="sort_order" className="text-sm font-medium">Sort Order</label>
                  <Input
                    id="sort_order"
                    type="number"
                    min="0"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium">Active</label>
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
                  {editingCategory ? "Update Category" : "Create Category"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            All Categories
          </CardTitle>
          <CardDescription>
            {filteredCategories.length} category{filteredCategories.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <AdminTableSkeleton rows={5} columns={6} showSearch={false} />
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No categories found. Create your first category!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sort Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {category.description || "-"}
                    </TableCell>
                    <TableCell>{category.sort_order}</TableCell>
                    <TableCell>
                      <Badge variant={category.is_active ? "default" : "secondary"}>
                        {category.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(category.id)}
                          disabled={deleting === category.id}
                        >
                          {deleting === category.id ? (
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
