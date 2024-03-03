import NextAuth from "next-auth";
import { options } from "@/context/options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
