import { useFetcher } from "@/hook/useFetcher";
import { supabase } from "@/lib/supabase";
import { UserProfile } from "@/types/profile";
import { useUser } from "@clerk/nextjs";
import { Check, Edit3, Loader2, X } from "lucide-react";
import React, { useCallback, useState } from "react";

interface Class {
  id: string;
  name: string;
}

const UpdateClass = ({profile} : {profile:UserProfile | null}) => {
  const { user: clerkUser } = useUser();
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  // Fetch available classes
  const fetchClasses: () => Promise<Class[]> = useCallback(async () => {
    const { data, error } = await supabase
      .from("classes")
      .select("id, name")
      .order("name");

    if (error) throw error;
    return data || [];
  }, []);

  const { data: classes } = useFetcher<Class[]>(fetchClasses);

  // Update user class
  const updateUserClass = async () => {
    if (!clerkUser?.id || !selectedClassId) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ class_id: selectedClassId })
        .eq("clerk_id", clerkUser.id);

      if (error) throw error;

      // Refresh profile data
      window.location.reload();
    } catch (error) {
      console.error("Error updating class:", error);
    } finally {
      setIsUpdating(false);
      setIsEditingClass(false);
    }
  };
  return (
    <div className="pt-2">
      {isEditingClass ? (
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border-2 border-gray-200 w-fit mx-auto sm:mx-0">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-transparent font-bold text-gray-700 outline-none text-sm"
          >
            <option value="">Select Class</option>
            {classes?.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          <button
            onClick={updateUserClass}
            disabled={isUpdating || !selectedClassId}
            className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {isUpdating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsEditingClass(false)}
            className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <div className="px-4 py-2 bg-blue-50 text-[#4854F6] font-black rounded-xl text-sm border-2 border-blue-100">
            {classes?.find((c) => c.id === profile?.class_id)?.name ||
              "No Class Set"}
          </div>
          <button
            onClick={() => {
              setIsEditingClass(true);
              setSelectedClassId(profile?.class_id || "");
            }}
            className="p-2 text-gray-400 hover:text-[#4854F6] hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateClass;
