import NextAuth from "next-auth";

import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ],
  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for encrypting the session
};

export default NextAuth(authOptions);
