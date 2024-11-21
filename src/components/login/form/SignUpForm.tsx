import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Switch } from '@/components/ui/switch/Switch';
import { useAuthActions } from '@/features/auth/hooks/useAuth';

interface SignUpFormProps {
  onSignInClick: () => void;
}

export const SignUpForm = ({ onSignInClick }: SignUpFormProps) => {
  const [hasOrgId, setHasOrgId] = useState(false);
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuthActions();

  const formatOrgId = (value: string) => {
    const cleaned = value.replace(/[^\w]/g, '').toUpperCase();
    const matches = cleaned.match(/[\w]{1,4}/g);
    return matches ? matches.join('-') : '';
  };

  const handleOrgIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatOrgId(e.target.value);
    if (formatted.length <= 19) {
      setOrgId(formatted);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await register({
        email,
        password,
        organizationId: hasOrgId ? orgId : undefined
      });
      onSignInClick();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
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
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter">
          <span className="bg-gradient-to-r from-[#4b9402] to-[#E9E9E9] bg-clip-text text-transparent">
            Create Account
          </span>
        </h1>
        <p className="text-sm text-[#E9E9E9]/60">
          Join us to streamline your healthcare decisions
        </p>
      </div>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
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
            minLength={6}
            aria-label="Password"
          />
          <Input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            aria-label="Confirm Password"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="has-org-id"
              checked={hasOrgId}
              onCheckedChange={setHasOrgId}
              aria-label="I have an organization ID"
            />
            <label
              htmlFor="has-org-id"
              className="text-sm text-[#E9E9E9]/60 cursor-pointer select-none"
            >
              I have an organization ID
            </label>
          </div>

          {hasOrgId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={orgId}
                onChange={handleOrgIdChange}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                maxLength={19}
                className="font-mono"
                required={hasOrgId}
                aria-label="Organization ID"
              />
            </motion.div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <div className="text-center">
        <span className="text-sm text-[#E9E9E9]/60">
          Already have an account?{' '}
        </span>
        <Button variant="link" className="text-sm" onClick={onSignInClick}>
          Sign in
        </Button>
      </div>
    </motion.div>
  );
};