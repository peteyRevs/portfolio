'use client';

import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import Input from '../components/ui/Input';
import Checkbox from '../components/ui/Checkbox';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy form - doesn't submit anywhere
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rocket Body */}
              <path
                d="M 100 20 L 120 60 L 120 140 L 100 160 L 80 140 L 80 60 Z"
                fill="#60A5FA"
              />
              {/* Rocket Nose */}
              <path
                d="M 100 20 L 120 60 L 80 60 Z"
                fill="#3B82F6"
              />
              {/* Left Fin */}
              <path
                d="M 80 100 L 60 120 L 60 160 L 80 140 Z"
                fill="#93C5FD"
              />
              {/* Right Fin */}
              <path
                d="M 120 100 L 140 120 L 140 160 L 120 140 Z"
                fill="#93C5FD"
              />
              {/* Window */}
              <circle cx="100" cy="85" r="10" fill="#2563EB" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Client Login</h1>
          <p className="text-slate-400">Access your project dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              id="email"
              label="Email Address"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Input
              type="password"
              id="password"
              label="Password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={setRememberMe}
              />
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary py-3.5"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Contact us
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
