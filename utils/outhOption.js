import connectDB from "@/config/database";
import User from "@/models/user";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectDB();
        
        // Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        
        // If not, create user
        if (!userExists) {
          const username = profile.name.slice(0, 20);
          
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
        
        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        // Get user from database
        const user = await User.findOne({ email: session.user.email });
        
        if (user) {
          // Add user ID to session
          session.user.id = user._id.toString();
        }
        
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
