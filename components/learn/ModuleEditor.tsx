"use client";

import React, { useState } from "react";
import { useModuleManagement } from "@/hooks/useModuleManagement";
import { motion } from "framer-motion";

interface ModuleEditorProps {
  onSuccess?: (moduleId: string) => void;
  initialData?: any;
}

export function ModuleEditor({ onSuccess, initialData }: ModuleEditorProps) {
  const { createModule, updateModule, loading, error } = useModuleManagement();
  const [activeTab, setActiveTab] = useState<"metadata" | "levels">("metadata");
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    num: initialData?.num || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "Budget Basics",
    accentA: initialData?.accentA || "#E53E3E",
    accentB: initialData?.accentB || "#F5C842",
    teacher: initialData?.teacher || {
      name: "",
      role: "",
      avatar: "👩🏾‍💼",
    },
  });

  const handleMetadataChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTeacherChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teacher: { ...prev.teacher, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await updateModule(initialData.id, formData);
      } else {
        await createModule(formData);
      }
      onSuccess?.(formData.id);
    } catch (err) {
      console.error("Error saving module:", err);
    }
  };

  const categories = [
    "Budget Basics",
    "Advanced",
    "Policy",
    "Fiscal",
    "General",
    "Kenya Context",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            {initialData ? "Edit Module" : "Create New Module"}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("metadata")}
            className={`flex-1 px-4 py-3 font-medium transition-colors ${
              activeTab === "metadata"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900"
            }`}
          >
            Module Info
          </button>
          <button
            onClick={() => setActiveTab("levels")}
            className={`flex-1 px-4 py-3 font-medium transition-colors ${
              activeTab === "levels"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900"
            }`}
          >
            Learning Levels
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Metadata Tab */}
          {activeTab === "metadata" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Module ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Module ID *
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    handleMetadataChange("id", e.target.value)
                  }
                  placeholder="e.g., bps-2026"
                  disabled={initialData?.id}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white disabled:opacity-50"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    handleMetadataChange("title", e.target.value)
                  }
                  placeholder="e.g., Budget Policy Statement 2026"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleMetadataChange("description", e.target.value)
                  }
                  placeholder="Module description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleMetadataChange("category", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Colors */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.accentA}
                      onChange={(e) =>
                        handleMetadataChange("accentA", e.target.value)
                      }
                      className="w-12 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={formData.accentA}
                      onChange={(e) =>
                        handleMetadataChange("accentA", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.accentB}
                      onChange={(e) =>
                        handleMetadataChange("accentB", e.target.value)
                      }
                      className="w-12 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={formData.accentB}
                      onChange={(e) =>
                        handleMetadataChange("accentB", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Instructor</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.teacher.name}
                      onChange={(e) =>
                        handleTeacherChange("name", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={formData.teacher.role}
                      onChange={(e) =>
                        handleTeacherChange("role", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                      Avatar Emoji
                    </label>
                    <input
                      type="text"
                      value={formData.teacher.avatar}
                      onChange={(e) =>
                        handleTeacherChange("avatar", e.target.value)
                      }
                      maxLength={2}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-2xl text-center"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Learning Levels Tab */}
          {activeTab === "levels" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <strong>Note:</strong> Learning levels (Stories, Basic, Advanced) are
                  managed through separate slide files. Use the API or file editor to
                  create and update slide content for each level.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {["stories", "basic", "advanced"].map((level) => (
                  <div
                    key={level}
                    className="border border-gray-200 dark:border-slate-700 rounded-lg p-4"
                  >
                    <h4 className="font-semibold capitalize mb-2">{level}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      Click "Manage Slides" to edit this level
                    </p>
                    <button
                      type="button"
                      className="mt-3 w-full px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded text-sm font-medium transition-colors"
                    >
                      Manage Slides
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg p-4"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
            >
              {loading ? "Saving..." : initialData ? "Update Module" : "Create Module"}
            </motion.button>
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
