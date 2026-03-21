import type { Metadata } from "next";
import { CreateModuleForm } from "@/components/learn/CreateModuleForm";

export const metadata: Metadata = {
  title: "Create Learning Module - Budget Ndio Story",
  description: "Create and submit your own learning module for the Budget Ndio Story platform.",
};

export default function CreateModulePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <CreateModuleForm />
    </div>
  );
}
