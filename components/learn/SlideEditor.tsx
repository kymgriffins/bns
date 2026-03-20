"use client";

import React, { useState, useEffect } from "react";
import { useModuleManagement } from "@/hooks/useModuleManagement";
import { motion } from "framer-motion";

interface SlideEditorProps {
  moduleId: string;
  level: "basic" | "advanced" | "stories";
  onSuccess?: () => void;
  initialSlideId?: string;
}

type SlideType = "cover" | "concept" | "chapters" | "pillars" | "stats" | "quiz" | "cta" | "videos" | "lessons";

export function SlideEditor({
  moduleId,
  level,
  onSuccess,
  initialSlideId,
}: SlideEditorProps) {
  const { addSlide, loading, error } = useModuleManagement();
  const [slideType, setSlideType] = useState<SlideType>("concept");
  const [slideData, setSlideData] = useState({
    id: "",
    type: "concept",
    bg: "bg-dark",
    orbA: "rgba(245,200,66,.3)",
    orbB: "rgba(56,178,172,.2)",
    content: {},
  });

  const slideTypes: SlideType[] = [
    "cover",
    "concept",
    "chapters",
    "pillars",
    "stats",
    "quiz",
    "cta",
    "videos",
    "lessons",
  ];

  const backgroundColors = [
    "bg-dark",
    "bg-red",
    "bg-blue",
    "bg-green",
    "bg-teal",
    "bg-purple",
    "bg-gold",
    "bg-orange",
  ];

  const handleTypeChange = (newType: SlideType) => {
    setSlideType(newType);
    setSlideData((prev) => ({
      ...prev,
      type: newType,
      content:
        newType === "cover"
          ? {
              tag: "",
              title: "",
              sub: "",
              promise: "",
            }
          : newType === "concept"
            ? {
                tag: "",
                tagBg: "",
                tagColor: "",
                question: "",
                bullets: [],
                badge: "",
              }
            : newType === "chapters"
              ? {
                  headline: "",
                  chapters: [],
                }
              : newType === "pillars"
                ? {
                    headline: "",
                    sub: "",
                    pillars: [],
                  }
                : newType === "stats"
                  ? {
                      headline: "",
                      stats: [],
                    }
                  : newType === "quiz"
                    ? {
                        question: "",
                        options: [],
                        correct: 0,
                        feedback: { correct: "", wrong: "" },
                      }
                    : newType === "cta"
                      ? {
                          title: "",
                          sub: "",
                          actions: [],
                        }
                      : {},
    }));
  };

  const handleContentChange = (field: string, value: any) => {
    setSlideData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSlide = {
        ...slideData,
        id: slideData.id || `slide-${Date.now()}`,
      };
      await addSlide(moduleId, level, newSlide);
      onSuccess?.();
      // Reset form
      setSlideData({
        id: "",
        type: "concept",
        bg: "bg-dark",
        orbA: "rgba(245,200,66,.3)",
        orbB: "rgba(56,178,172,.2)",
        content: {},
      });
    } catch (err) {
      console.error("Error adding slide:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Add New Slide</h1>
          <p className="text-green-100 text-sm mt-1">
            Module: {moduleId} • Level: {level}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Slide Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">
              Slide Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {slideTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                    slideType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Slide ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Slide ID (optional)
            </label>
            <input
              type="text"
              value={slideData.id}
              onChange={(e) =>
                setSlideData((prev) => ({ ...prev, id: e.target.value }))
              }
              placeholder="e.g., concept-1 (auto-generated if empty)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Background & Orbs */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Design</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Background
                </label>
                <select
                  value={slideData.bg}
                  onChange={(e) =>
                    setSlideData((prev) => ({ ...prev, bg: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  {backgroundColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Orb A (RGBA)
                </label>
                <input
                  type="text"
                  value={slideData.orbA}
                  onChange={(e) =>
                    setSlideData((prev) => ({ ...prev, orbA: e.target.value }))
                  }
                  placeholder="rgba(245,200,66,.3)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Orb B (RGBA)
                </label>
                <input
                  type="text"
                  value={slideData.orbB}
                  onChange={(e) =>
                    setSlideData((prev) => ({ ...prev, orbB: e.target.value }))
                  }
                  placeholder="rgba(56,178,172,.2)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Content Based on Type */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Content</h3>

            {slideType === "cover" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Tag</label>
                  <input
                    type="text"
                    value={slideData.content.tag || ""}
                    onChange={(e) => handleContentChange("tag", e.target.value)}
                    placeholder="e.g., Module 001 · Budget Basics"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <textarea
                    value={slideData.content.title || ""}
                    onChange={(e) =>
                      handleContentChange("title", e.target.value)
                    }
                    placeholder="Title (use *text* for emphasis)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={slideData.content.sub || ""}
                    onChange={(e) => handleContentChange("sub", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Promise
                  </label>
                  <textarea
                    value={slideData.content.promise || ""}
                    onChange={(e) =>
                      handleContentChange("promise", e.target.value)
                    }
                    placeholder="What will learners gain?"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            )}

            {slideType === "concept" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Tag</label>
                  <input
                    type="text"
                    value={slideData.content.tag || ""}
                    onChange={(e) => handleContentChange("tag", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Question
                  </label>
                  <textarea
                    value={slideData.content.question || ""}
                    onChange={(e) =>
                      handleContentChange("question", e.target.value)
                    }
                    placeholder="Main question (use *text* for emphasis)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Badge/Kenya Context
                  </label>
                  <input
                    type="text"
                    value={slideData.content.badge || ""}
                    onChange={(e) =>
                      handleContentChange("badge", e.target.value)
                    }
                    placeholder="🇰🇪 Kenya Context: ..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            )}

            {slideType === "quiz" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Question
                  </label>
                  <textarea
                    value={slideData.content.question || ""}
                    onChange={(e) =>
                      handleContentChange("question", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Correct Answer Index (0-based)
                  </label>
                  <input
                    type="number"
                    value={slideData.content.correct || 0}
                    onChange={(e) =>
                      handleContentChange("correct", parseInt(e.target.value))
                    }
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            )}

            {(slideType === "chapters" || slideType === "pillars") && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={slideData.content.headline || ""}
                  onChange={(e) =>
                    handleContentChange("headline", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Items are managed via the API or JSON editor
                </p>
              </div>
            )}
          </div>

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
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
            >
              {loading ? "Adding..." : "Add Slide"}
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
