import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials", // This will be shown as the provider name (can be customized)
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Make a request to your backend login route
          const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          // If the login is successful, return the user object
          if (res.ok && data) {
            return {
              id: data.userID,
              name: data.username,
              email: data.email, 
            };
          } else {
            return null; // Return null to signal failure
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to custom login page
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user properties to the token when logging in
      if (user) {
        token.id = user.id; // Add user ID
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token properties to the session object
      if (token) {
        session.user = {
          id: token.id, // Ensure ID is available in session.user
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Use the secret defined in your environment
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
