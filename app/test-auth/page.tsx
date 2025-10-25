"use client";

import { useAuth } from "@/lib/auth-provider";
import { useEffect } from "react";

export default function TestAuth() {
  const { user, loading, signInWithGoogle } = useAuth();

  useEffect(() => {
    console.log("Auth state:", { user: !!user, loading });
  }, [user, loading]);

  if (loading) {
    return <div className="p-8">Loading auth state...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>

      {user ? (
        <div className="space-y-4">
          <p className="text-green-600">✅ User is authenticated!</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-orange-600">❌ User is not authenticated</p>
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold">Environment Check:</h2>
        <p>
          Supabase URL:{" "}
          {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Present" : "❌ Missing"}
        </p>
        <p>
          Supabase Key:{" "}
          {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            ? "✅ Present"
            : "❌ Missing"}
        </p>
      </div>
    </div>
  );
}
