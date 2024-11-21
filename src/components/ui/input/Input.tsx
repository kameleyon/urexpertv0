import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border bg-[#0D1D2D]/50 border-[#4b9402]/20 px-4 py-2',
          'text-[#E9E9E9] placeholder:text-[#E9E9E9]/30',
          'focus:outline-none focus:ring-2 focus:ring-[#4b9402] focus:border-[#4b9402]',
          'transition-all duration-300',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };