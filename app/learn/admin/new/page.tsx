"use client";

import { useRouter } from "next/navigation";
import { ModuleEditor } from "@/components/learn/admin/ModuleEditor";

export default function NewModulePage() {
  const router = useRouter();

  const defaultData = {
    module: {
      id: "new-module-" + Date.now(),
      num: "000",
      title: "New Untitled Module",
      level: "basic",
      credits: "Budget Ndio Story",
      desc: "Enter a brief description of what students will learn in this module.",
      duration: "10 min",
      slidesCount: 0,
      lessonsCount: 0,
      videosCount: 0,
      quizCount: 0,
      category: "Uncategorized",
      catColor: "#F5C842",
      catBg: "rgba(245, 200, 66, 0.12)",
      accentA: "#F5C842",
      accentB: "#38B2AC",
      teacher: {
        name: "New Teacher",
        role: "Educator",
        avatar: "👤",
      },
      types: ["learn"],
    },
    stories: [],
    lessons: [],
    videos: [],
    quiz: [],
  };

  const handleSave = async (newData: any) => {
    console.log("Creating new module:", newData);
    // Simulate persistence latency for realistic UI states
    await new Promise((resolve) => setTimeout(resolve, 850));
    router.push("/learn/admin");
  };

  return (
    <div className="h-screen overflow-hidden">
      <ModuleEditor 
        initialData={defaultData} 
        onSave={handleSave} 
        onBack={() => router.push("/learn/admin")} 
      />
    </div>
  );
}
