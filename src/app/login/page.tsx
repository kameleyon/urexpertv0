'use client';

import { LoginForm } from '@/components/login/login-form';
import { LoginFeatures } from '@/components/login/login-features';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#101F28] to-[#1D324B] flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md mb-8">
          <Image
            src="/urexpertlogo.png"
            alt="URExpert Logo"
            width={200}
            height={200}
            className="mx-auto"
            priority
          />
        </div>
        <LoginForm />
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:block lg:w-1/2 bg-[#0D1D2D]/50 backdrop-blur-sm">
        <LoginFeatures />
      </div>
    </div>
  );
}