// Hook for managing module CRUD operations
import { useState, useCallback } from "react";

interface CreateModuleParams {
  id: string;
  title: string;
  description: string;
  category?: string;
  accentA?: string;
  accentB?: string;
  teacher?: {
    name: string;
    role: string;
    avatar: string;
  };
}

interface UpdateModuleParams {
  title?: string;
  description?: string;
  status?: "draft" | "published" | "archived";
  [key: string]: any;
}

export function useModuleManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createModule = useCallback(
    async (moduleData: CreateModuleParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/learn/modules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(moduleData),
        });

        if (!response.ok) {
          throw new Error("Failed to create module");
        }

        const data = await response.json();
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateModule = useCallback(
    async (moduleId: string, updateData: UpdateModuleParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/learn/modules/${moduleId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error("Failed to update module");
        }

        const data = await response.json();
        return data.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteModule = useCallback(async (moduleId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/learn/modules/${moduleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete module");
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getModule = useCallback(async (moduleId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/learn/modules/${moduleId}`);

      if (!response.ok) {
        throw new Error("Module not found");
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSlides = useCallback(
    async (moduleId: string, level: "basic" | "advanced" | "stories", slidesData: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/learn/modules/${moduleId}/slides?level=${level}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slidesData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update slides");
        }

        const data = await response.json();
        return data.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addSlide = useCallback(
    async (moduleId: string, level: "basic" | "advanced" | "stories", slideData: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/learn/modules/${moduleId}/slides?level=${level}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slideData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add slide");
        }

        const data = await response.json();
        return data.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    createModule,
    updateModule,
    deleteModule,
    getModule,
    updateSlides,
    addSlide,
    loading,
    error,
  };
}
