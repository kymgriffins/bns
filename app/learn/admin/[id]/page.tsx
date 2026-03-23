"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getModuleData } from "@/lib/learn-data";
import { ModuleEditor } from "@/components/learn/admin/ModuleEditor";

export default function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const moduleData = getModuleData(id);
    if (moduleData) {
      setData(moduleData);
    }
    setLoading(false);
  }, [id]);

  const handleSave = (updatedData: any) => {
    console.log("Saving updated module data:", updatedData);
    // Simulate persistence
    alert(`Success! Module "${updatedData.module.title}" has been saved. \n\nCheck the console for the updated JSON payload.`);
    router.push("/learn/admin");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050508] text-white">
        <div className="h-8 w-8 border-2 border-[#F5C842] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050508] text-white">
        <div className="text-center">
           <h2 className="text-xl font-serif mb-4">Module not found</h2>
           <button onClick={() => router.push("/learn/admin")} className="text-[#F5C842] text-sm underline">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <ModuleEditor 
        initialData={data} 
        onSave={handleSave} 
        onBack={() => router.push("/learn/admin")} 
      />
    </div>
  );
}
