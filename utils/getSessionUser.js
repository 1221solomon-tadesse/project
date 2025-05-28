import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/outhOption";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("Session from getServerSession:", session);

    if (!session || !session.user) {
      console.log("No session or user found");
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Error in getSessionUser:", error);
    return null;
  }
};
