import { motion } from 'framer-motion';
import { Shield, Zap, Clock, LineChart } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

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

export const FeatureGrid = () => (
  <div className="grid grid-cols-2 gap-6 mt-10">
    {features.map((feature, index) => (
      <FeatureCard
        key={feature.title}
        feature={feature}
        index={index}
      />
    ))}
  </div>
);