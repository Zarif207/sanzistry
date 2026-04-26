"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/authContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password);
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-14 md:pt-26 flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-110"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center w-11 h-11 border border-[#1a1a1a]/30 font-serif text-base font-light tracking-widest mb-7">
            S
          </Link>
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1a1a1a]/35 mb-2">Join us</p>
          <h1 className="font-serif text-[2.4rem] font-light leading-tight">Create Account</h1>
          <div className="w-8 h-px bg-[#c5a47e] mx-auto mt-4" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <AuthInput label="Full name" type="text" value={name} onChange={setName} placeholder="Your name" />
            <AuthInput label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <AuthInput label="Password" type="password" value={password} onChange={setPassword} placeholder="Min. 6 characters" />
          </div>

          {error && (
            <p className="text-[12px] text-red-400 tracking-wide text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-cut w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-[12px] text-[#1a1a1a]/40 tracking-wide mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-[#c5a47e] hover:text-[#a8895e] transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

function AuthInput({
  label, type, value, onChange, placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] tracking-[0.35em] uppercase text-[#1a1a1a]/40 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[#1a1a1a]/15 pb-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#c5a47e] transition-colors duration-300"
      />
    </div>
  );
}
