import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// auth configuration
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        // If the login is successful, return user data with access token
        if (res.ok && data.success && data.data) {
          return { ...data.data.user, accessToken: data.data.accessToken };
        }

        // If login fails, throw an error with the error message from the backend
        throw new Error(data.message || "Login failed");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // JWT callback to add user data and access token to JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    // Session callback to store access token and user data in the session
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      return session;
    },
  },
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
