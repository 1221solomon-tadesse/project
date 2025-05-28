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
    // Called after successful sign in
    async signIn({ profile }) {
      // Connect to database
      await connectDB();
      
      console.log("Profile from Google:", profile);

      // Check if user exists
      const userExists = await User.findOne({ email: profile.email });

      // If not, create user
      if (!userExists) {
        // Get user name or use email as fallback
        const username = profile.name.replace(/\s/g, "").toLowerCase();

        await User.create({
          email: profile.email,
          username,
          name: profile.name,
          image: profile.picture,
        });
      }

      return true;
    },
    // Modify session object
    async session({ session }) {
      // Get user from database
      const user = await User.findOne({ email: session.user.email });
      
      console.log("User from database:", user);

      // Add user ID to session
      if (user) {
        session.user.id = user._id.toString();
        session.user.username = user.username;
      }

      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to token if available
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
