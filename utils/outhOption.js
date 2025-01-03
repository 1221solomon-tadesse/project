import connectDB from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        // Check if user exists
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        // Validate password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return user object on successful authentication
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // Custom login page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
