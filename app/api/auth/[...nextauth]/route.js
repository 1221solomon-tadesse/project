import NextAuth from "next-auth";
import { authOptions } from "@/utils/outhOption";

console.log("NextAuth route initialized");
console.log("Auth URL:", process.env.NEXTAUTH_URL);
console.log("Google Client ID configured:", !!process.env.GOOGLE_CLIENT_ID);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
