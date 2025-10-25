"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-provider";
import { Button } from "./ui/button";

type NavbarProps = object;

const Navbar: React.FC<NavbarProps> = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <nav
        className="rounded-xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1rem 2rem",
          padding: "0.5rem 2rem",
          background: "#222",
          color: "#fff",
        }}
      >
        <Link
          href="/"
          style={{ fontWeight: "bold", fontSize: "1.3rem" }}
          className={"hover:bg-sky-700"}
        >
          🔒 | LockedIn
        </Link>
        <div>Loading...</div>
      </nav>
    );
  }

  return (
    <nav
      className="rounded-xl"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem 2rem",
        padding: "0.5rem 2rem",
        background: "#222",
        color: "#fff",
      }}
    >
      <Link
        href="/"
        style={{ fontWeight: "bold", fontSize: "1.3rem" }}
        className={"hover:bg-sky-700"}
      >
        🔒 | LockedIn
      </Link>
      <div
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        className={"font-sans"}
      >
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>

        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <span className="text-gray-300">{user.email}</span>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="text-black"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/signup">Get Started</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
