import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { LoginHeader } from './LoginHeader';
import { RememberMe } from './RememberMe';
import { useAuthActions } from '@/features/auth/hooks/useAuth';

interface LoginFormProps {
  onSignUpClick: () => void;
}

export const LoginForm = ({ onSignUpClick }: LoginFormProps) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);
      await login({ email, password, remember: rememberMe });
    } catch (err: any) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-6 p-8 backdrop-blur-sm bg-[#0D1D2D]/30 rounded-2xl border border-[#4b9402]/10 shadow-[0_0_50px_0_rgba(75,148,2,0.15)]"
    >
      <LoginHeader />
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>

        <div className="flex items-center justify-between">
          <RememberMe
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          <Button variant="link">
            Forgot password?
          </Button>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center">
        <span className="text-sm text-[#E9E9E9]/60">
          Don't have an account?{' '}
        </span>
        <Button variant="link" className="text-sm" onClick={onSignUpClick}>
          Sign up
        </Button>
      </div>
    </motion.div>
  );
};