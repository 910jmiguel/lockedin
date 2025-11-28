"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-provider";
import { Button } from "./ui/button";
import { Menu, X, Lock, Sparkles } from "lucide-react";

type NavbarProps = object;

const Navbar: React.FC<NavbarProps> = () => {
  const { user, signOut, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl hover:scale-105 transition-transform"
            >
              <Lock className="w-6 h-6 text-purple-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                LockedIn
              </span>
            </Link>
            <div className="text-gray-400 animate-pulse">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl group hover:scale-105 transition-transform"
          >
            <Lock className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              LockedIn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors font-medium relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 text-sm max-w-[150px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    onClick={signOut}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200"
                    size="sm"
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-slate-900/95 backdrop-blur-md">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-4 py-2 text-gray-400 text-sm border-t border-white/10 mt-2 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>{user.email}</span>
                    </div>
                    <Button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      size="sm"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="mx-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
