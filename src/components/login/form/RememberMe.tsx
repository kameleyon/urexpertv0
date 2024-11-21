import { Switch } from '@/components/ui/switch/Switch';

interface RememberMeProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const RememberMe = ({ checked, onCheckedChange }: RememberMeProps) => (
  <div className="flex items-center space-x-2">
    <Switch
      id="remember-me"
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label="Remember me"
    />
    <label
      htmlFor="remember-me"
      className="text-sm text-[#E9E9E9]/60 cursor-pointer select-none"
    >
      Remember me
    </label>
  </div>
);