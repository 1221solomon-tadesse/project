import { authOptions } from '@/utils/outhOption'
import NextAuth from "next-auth/next";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
