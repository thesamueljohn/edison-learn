import { supabase } from "./supabase";

export const updateProgress = async (
  topicId: string,
  userId: string,
) => {
  const { data, error } = await supabase
    .from("student_progress")
    .upsert({
      topic_id: topicId,
      user_id: userId,
      completed: true,
      last_attempt: new Date().toISOString(),
    }, {
      onConflict: "topic_id,user_id",
    })
    .select()
    .single();

  // update user xp in profiles table

  let { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select("*")
    .eq('clerk_id', userId)

  if (profilesError) {
    console.error("Error fetching profile:", profilesError);
    // throw profilesError;
  }

  const userProfile = profiles ? profiles[0] : null;

  if (userProfile) {
    const newXp = userProfile.xp + 10; // assuming each topic completion gives 10 xp

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ xp: newXp })
      .eq('clerk_id', userId);

    if (updateError) {
      console.error("Error updating XP:", updateError);
      // throw updateError;
    }
  }


  if (error) {
    console.error("Error updating progress:", error);
    // throw error;
  }

  return data;
};