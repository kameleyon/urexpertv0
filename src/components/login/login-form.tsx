'use client';

import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-[#96C21A] to-[#E9E9E9] bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-sm text-[#E9E9E9]/60">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#E9E9E9]/80">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="bg-[#0D1D2D]/50 border-[#96C21A]/20 text-[#E9E9E9] placeholder:text-[#E9E9E9]/30 focus:border-[#96C21A] transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#E9E9E9]/80">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="bg-[#0D1D2D]/50 border-[#96C21A]/20 text-[#E9E9E9] placeholder:text-[#E9E9E9]/30 focus:border-[#96C21A] transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          <Label htmlFor="remember-me" className="text-sm text-[#E9E9E9]/60">Remember me</Label>
        </div>
        <Button variant="link" className="text-[#96C21A] hover:text-[#96C21A]/80">
          Forgot password?
        </Button>
      </div>

      <Button
        className="w-full bg-[#96C21A] hover:bg-[#96C21A]/90 text-black font-medium transition-all duration-300"
      >
        Sign In
      </Button>

      <p className="text-center text-sm text-[#E9E9E9]/60">
        Don't have an account?{' '}
        <Button variant="link" className="text-[#96C21A] hover:text-[#96C21A]/80">
          Sign up
        </Button>
      </p>
    </motion.div>
  );
}