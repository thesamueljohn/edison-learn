import { useFetcher } from "@/hook/useFetcher";
import { supabase } from "@/lib/supabase";
import { ChevronRight, MedalIcon } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

type UserProfile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  xp: number | null;
};

const LeaderBoardCard = ({ sliceBy }: { sliceBy: number }) => {
  const fetchUsers = useCallback(async () => {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("xp", { ascending: false });
      
    if (error) {
      throw error;
    }
    return profiles as UserProfile[];
  }, []);

  const { data: users, isPending, error } = useFetcher(fetchUsers);
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 p-6">
      <h3 className="font-black text-xl text-gray-700">
        Global leaderboard
      </h3>
      <p className="text-sm text-gray-500  mb-6">Complete topics to gain XP</p>
      <div className="flex items-center gap-4 mb-4 hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer">
        <div className="w-14 h-14 rounded-full border-2 border-gray-200 p-1">
          <div className="w-full h-full bg-[#4854F6] rounded-full flex items-center justify-center text-white font-black">
            <MedalIcon fill="orange" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-gray-800 text-lg">Sage League</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Top {sliceBy} Global
          </p>
        </div>
        <ChevronRight className="text-gray-300" strokeWidth={3} />
      </div>

      {/* Mini Ranking List */}
      <div className="space-y-2 mt-4">
        {isPending &&
          [1, 2, 3].map((rank) => (
            <div
              key={rank}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50"
            >
              <span
                className={`font-black w-6 ${
                  rank === 1 ? "text-[#FFC800]" : "text-gray-400"
                }`}
              >
                {rank}
              </span>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-3 w-20 bg-gray-100 rounded-full"></div>
            </div>
          ))}

        {!isPending &&
          users &&
          users.slice(0, sliceBy ? sliceBy : 5).map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50"
            >
              <span
                className={`font-black w-6 ${
                  index === 0 ? "text-[#FFC800]" : "text-gray-400"
                }`}
              >
                {index + 1}
              </span>
              <img
                src={user.avatar_url || "/default-avatar.png"}
                alt={user.full_name || "User Avatar"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium text-gray-700">
                {user.full_name || "Anonymous"}
              </span>

              <span className="ml-auto font-bold text-gray-800">
                {user.xp || 0} XP
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeaderBoardCard;
