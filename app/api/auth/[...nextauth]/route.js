import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '/models/users';
import { connectoDB } from '/utils/database';
import { authOptions } from '/utils/authOptions';

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
export const handler = NextAuth({
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
],
callbacks: {
  async session({ session }) {
    try {
      if (session?.user?.email) {
        const sessionUser = await User.findOne({ email: session.user?.email });
        
        console.log(sessionUser)
        if(sessionUser) {
          session.user.id = sessionUser._id.toString()
        }
      }

      return session;
    } catch (error) {
      console.error("Error in session callback:", error);
      return session; // Fallback in case of error
    }
  },
  async signIn({ account, profile, user, credentials }) {
    try {
      await connectoDB();

      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ","").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.error("Error in signIn callback:", error.message);
      return false; // Return false to prevent sign-in if there is an error
    }
  },
},
});

export { handler as GET, handler as POST };