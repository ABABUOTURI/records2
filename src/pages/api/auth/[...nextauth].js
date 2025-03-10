import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter email and password.");
        }

        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db("employee");
        const usersCollection = db.collection("users");

        // Find user by email
        const user = await usersCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("User not found.");
        }

        // Compare hashed password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          client.close();
          throw new Error("Incorrect password.");
        }

        client.close();
        return { id: user._id.toString(), name: user.name || "User", email: user.email };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      console.log("User after sign-in:", user);
      return true;
    },
    async session({ session, token }) {
      session.user = token.user; // ✅ Include user in session
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user; // ✅ Ensure JWT stores user info
      return token;
    },
  },

  pages: {
    signIn: "/SigninPage",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
