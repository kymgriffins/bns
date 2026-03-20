"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { ModuleMetadata } from "@/app/learn/utils";

export function CreateModuleForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<ModuleMetadata>>({
    id: "",
    num: "",
    title: "",
    description: "",
    category: "General",
    credits: [],
    accentA: "#E53E3E",
    accentB: "#F5C842",
    structure: {
      basic: {
        title: "",
        description: "",
        duration: "15 min",
        level: "basic",
        slides: 10,
      },
    },
    teacher: {
      name: "",
      role: "",
      avatar: "👤",
    },
    tags: [],
    isLocked: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.currentTarget;

    if (type === "checkbox") {
      const checked = (e.currentTarget as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        isLocked: checked,
      }));
    } else if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...((prev as any)[section] || {}),
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.id || !formData.title || !formData.description) {
        throw new Error("Please fill in all required fields");
      }

      const response = await fetch("/api/learn/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create module");
      }

      setSuccess(true);
      setFormData({
        id: "",
        num: "",
        title: "",
        description: "",
        category: "General",
        credits: [],
        accentA: "#E53E3E",
        accentB: "#F5C842",
        structure: {},
        teacher: {
          name: "",
          role: "",
          avatar: "👤",
        },
        tags: [],
        isLocked: false,
      });

      setTimeout(() => {
        router.refresh();
        window.location.href = "/learn";
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create a New Learning Module</h1>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Module created successfully! Redirecting...
        </div>
      )}

      {/* Basic Info */}
      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-xl font-semibold mb-4">Basic Information</legend>

        <div className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium mb-1">
              Module ID * <span className="text-gray-500 text-xs">(e.g., finance-bill-2024)</span>
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id || ""}
              onChange={handleChange}
              placeholder="unique-module-id"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="num" className="block text-sm font-medium mb-1">
              Module Number <span className="text-gray-500 text-xs">(e.g., 003)</span>
            </label>
            <input
              type="text"
              id="num"
              name="num"
              value={formData.num || ""}
              onChange={handleChange}
              placeholder="003"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Module Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Brief description of the module"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category || "General"}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="General">General</option>
              <option value="Budget Basics">Budget Basics</option>
              <option value="Advanced">Advanced</option>
              <option value="Policy">Policy</option>
              <option value="Fiscal">Fiscal</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Basic Level Content */}
      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-xl font-semibold mb-4">Basic Level Content</legend>

        <div className="space-y-4">
          <div>
            <label htmlFor="basic-title" className="block text-sm font-medium mb-1">
              Basic Level Title
            </label>
            <input
              type="text"
              id="basic-title"
              name="structure.basic.title"
              value={(formData.structure?.basic as any)?.title || ""}
              onChange={handleChange}
              placeholder="Simple introduction for beginners"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="basic-desc" className="block text-sm font-medium mb-1">
              Basic Level Description
            </label>
            <textarea
              id="basic-desc"
              name="structure.basic.description"
              value={(formData.structure?.basic as any)?.description || ""}
              onChange={handleChange}
              placeholder="What will beginners learn in the basic level?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="basic-duration" className="block text-sm font-medium mb-1">
              Estimated Duration
            </label>
            <input
              type="text"
              id="basic-duration"
              name="structure.basic.duration"
              value={(formData.structure?.basic as any)?.duration || ""}
              onChange={handleChange}
              placeholder="e.g., 10 min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="basic-slides" className="block text-sm font-medium mb-1">
              Number of Slides
            </label>
            <input
              type="number"
              id="basic-slides"
              name="structure.basic.slides"
              value={(formData.structure?.basic as any)?.slides || 10}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </fieldset>

      {/* Teacher Info */}
      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-xl font-semibold mb-4">Instructor Information</legend>

        <div className="space-y-4">
          <div>
            <label htmlFor="teacher-name" className="block text-sm font-medium mb-1">
              Instructor Name
            </label>
            <input
              type="text"
              id="teacher-name"
              name="teacher.name"
              value={formData.teacher?.name || ""}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="teacher-role" className="block text-sm font-medium mb-1">
              Role / Title
            </label>
            <input
              type="text"
              id="teacher-role"
              name="teacher.role"
              value={formData.teacher?.role || ""}
              onChange={handleChange}
              placeholder="e.g., Budget Analyst"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="teacher-avatar" className="block text-sm font-medium mb-1">
              Avatar (Emoji)
            </label>
            <input
              type="text"
              id="teacher-avatar"
              name="teacher.avatar"
              value={formData.teacher?.avatar || ""}
              onChange={handleChange}
              placeholder="👤"
              maxLength={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </fieldset>

      {/* Color Settings */}
      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-xl font-semibold mb-4">Module Colors</legend>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="accentA" className="block text-sm font-medium mb-1">
              Primary Color
            </label>
            <input
              type="color"
              id="accentA"
              name="accentA"
              value={formData.accentA || "#E53E3E"}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="accentB" className="block text-sm font-medium mb-1">
              Secondary Color
            </label>
            <input
              type="color"
              id="accentB"
              name="accentB"
              value={formData.accentB || "#F5C842"}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </fieldset>

      {/* Additional Settings */}
      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-xl font-semibold mb-4">Additional Settings</legend>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isLocked || false}
            onChange={handleChange}
            className="w-4 h-4 border border-gray-300 rounded"
          />
          <span className="text-sm font-medium">Mark as Locked (Coming Soon)</span>
        </label>
      </fieldset>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || success}
          className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Module"}
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> After creating a module, you'll need to upload the slide content (JSON files) separately. Each module should have slide-basic.json and slide-advanced.json files.
        </p>
      </div>
    </form>
  );
}
