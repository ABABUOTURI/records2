"use client"; // Only this component is client-side

import { signOut, useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded">
      Logout
    </button>
  ) : null;
}
