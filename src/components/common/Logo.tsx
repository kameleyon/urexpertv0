import { motion } from 'framer-motion';

export const Logo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center"
  >
    <img
      src="/urexpertlogo.png"
      alt="URExpert Logo"
      className="w-48 h-auto drop-shadow-2xl"
    />
  </motion.div>
);