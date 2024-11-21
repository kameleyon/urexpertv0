import { motion } from 'framer-motion';

export const LoginHeader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="space-y-2 text-center"
  >
    <h1 className="text-3xl font-bold tracking-tighter">
      <span className="bg-gradient-to-r from-[#4b9402] to-[#E9E9E9] bg-clip-text text-transparent">
        Welcome Back
      </span>
    </h1>
    <p className="text-sm text-[#E9E9E9]/60">
      Enter your credentials to access your account
    </p>
  </motion.div>
);