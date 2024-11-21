import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const { icon: Icon, title, description } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
      className="group p-4 rounded-xl backdrop-blur-sm bg-[#0D1D2D]/20 border border-[#4b9402]/10 
                 hover:bg-[#4b9402]/5 hover:border-[#4b9402]/30 transition-all duration-300"
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 text-[#4b9402] group-hover:scale-110 transition-transform duration-300" />
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-[#E9E9E9] group-hover:text-[#4b9402] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs leading-relaxed text-[#E9E9E9]/60">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};