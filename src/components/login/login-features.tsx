'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Clock, LineChart } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Access',
    description: 'Enterprise-grade security protocols and encryption'
  },
  {
    icon: Zap,
    title: 'Real-Time Analysis',
    description: 'Instant medical chart processing and recommendations'
  },
  {
    icon: Clock,
    title: 'Time-Saving',
    description: 'Reduce review time by up to 60% with AI assistance'
  },
  {
    icon: LineChart,
    title: 'Analytics',
    description: 'Comprehensive insights and performance metrics'
  }
];

export function LoginFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="hidden lg:flex flex-col justify-center space-y-8 p-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#96C21A] to-[#E9E9E9] bg-clip-text text-transparent">
          Revolutionizing Healthcare Decisions
        </h2>
        <p className="text-[#E9E9E9]/60 text-sm">
          Empowering healthcare providers with AI-driven insights
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <feature.icon className="w-5 h-5 text-[#96C21A]" />
              <h3 className="text-sm font-medium text-[#E9E9E9]">{feature.title}</h3>
            </div>
            <p className="text-xs text-[#E9E9E9]/60">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}