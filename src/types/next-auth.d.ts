import "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: User;
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken?: string;
    // Add any other user properties your application needs
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: User;
  }
}
