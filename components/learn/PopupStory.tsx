"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupStoryProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function PopupStory({
  isOpen,
  title,
  content,
  onClose,
  icon,
  action,
}: PopupStoryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 z-50 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close popup"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                {icon && <span className="text-3xl">{icon}</span>}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {title}
                </h2>
              </div>

              {/* Body */}
              <div className="prose dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed"
                />
              </div>

              {/* Action Button */}
              {action && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.onClick}
                  className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {action.label}
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
