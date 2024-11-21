import { motion } from 'framer-motion';
import { X, Bell, Lock, Shield, UserCircle, Globe, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button/Button';
import { Switch } from '../ui/switch/Switch';
import { useState } from 'react';

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="absolute right-0 top-0 h-full w-96 bg-[#0D1D2D] border-l border-[#96C21A]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-[#96C21A]/20">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-[#E9E9E9]">Settings</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-[#96C21A]/10"
              >
                <X className="w-5 h-5 text-[#96C21A]" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#E9E9E9]/80">Notifications</h3>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-[#96C21A]" />
                  <span className="text-sm text-[#E9E9E9]/60">Push Notifications</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#E9E9E9]/80">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-[#96C21A]" />
                    <span className="text-sm text-[#E9E9E9]/60">Two-Factor Authentication</span>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-[#E9E9E9]/60 hover:bg-[#96C21A]/10"
                >
                  <Shield className="w-5 h-5 text-[#96C21A] mr-3" />
                  Security Log
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#E9E9E9]/80">Account</h3>
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-[#E9E9E9]/60 hover:bg-[#96C21A]/10"
                >
                  <UserCircle className="w-5 h-5 text-[#96C21A] mr-3" />
                  Profile Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-[#E9E9E9]/60 hover:bg-[#96C21A]/10"
                >
                  <Globe className="w-5 h-5 text-[#96C21A] mr-3" />
                  Language & Region
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-red-500">Danger Zone</h3>
              <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                <h4 className="text-sm font-medium text-red-500 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Delete Account
                </h4>
                <p className="text-xs text-[#E9E9E9]/60 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};