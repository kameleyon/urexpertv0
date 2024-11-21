import { motion } from 'framer-motion';

export const FeaturesHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-3"
  >
    <h2 className="text-2xl font-bold">
      <span className="bg-gradient-to-r from-[#4b9402] to-[#E9E9E9] bg-clip-text text-transparent">
        Revolutionizing Healthcare Decisions
      </span>
    </h2>
    <p className="text-sm text-[#E9E9E9]/60 max-w-md">
      Empowering healthcare providers with AI-driven insights for better patient outcomes
    </p>
  </motion.div>
);