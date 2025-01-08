import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// auth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const res = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          // If the login is successful, return user data with access token
          if (res.ok && data.success && data.data) {
            return { ...data.data.user, accessToken: data.data.accessToken };
          }

          // If login fails, throw an error with the error message from the backend
          throw new Error(data.message || "Login failed");
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Login failed"
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
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
