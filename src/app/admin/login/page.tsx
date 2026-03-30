"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          router.push("/admin");
          router.refresh();
        } else {
          setError("Invalid administrative credentials.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-container-highest rounded-2xl p-10 shadow-2xl shadow-primary/10 border border-outline-variant/10">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-on-surface font-manrope tracking-tight">
            Admin Access
          </h1>
          <p className="text-on-surface-variant/60 text-sm mt-2 font-inter">
            Protected ledger management area
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Manager Password"
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-12 py-4 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/30"
                required
                disabled={isPending}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant/40 hover:text-primary transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <p className="text-error text-xs font-bold pl-1 animate-pulse">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-surface py-4 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center group hover:bg-primary-container transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? "Verifying..." : (
              <>
                Unlock Dashboard
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/30 font-bold font-manrope">
            Project สพต. • Secured Access
          </p>
        </div>
      </div>
    </div>
  );
}
