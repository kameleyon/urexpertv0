import { motion } from 'framer-motion';
import { FeatureGrid } from './FeatureGrid';
import { FeaturesHeader } from './FeaturesHeader';

export const LoginFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-screen flex flex-col justify-center p-10 backdrop-blur-md bg-gradient-to-r from-[#0D1D2D]/60 to-transparent"
    >
      <FeaturesHeader />
      <FeatureGrid />
    </motion.div>
  );
};