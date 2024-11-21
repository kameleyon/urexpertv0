import { motion } from 'framer-motion';
import { X, Edit2, Camera } from 'lucide-react';
import { Button } from '../ui/button/Button';
import { Input } from '../ui/input/Input';
import { useState } from 'react';
import { ProfileAnalytics } from './ProfileAnalytics';
import { useAuth } from '@/features/auth/context/AuthContext';

interface ProfilePanelProps {
  onClose: () => void;
}

export const ProfilePanel = ({ onClose }: ProfilePanelProps) => {
  const { state: { user } } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: user?.email || '',
    dailyGoal: '15',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    if (field === 'dailyGoal') {
      // Only allow numbers and limit to reasonable values
      const numValue = parseInt(value) || 0;
      if (numValue >= 0 && numValue <= 999) {
        setFormData(prev => ({ ...prev, [field]: numValue.toString() }));
      }
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setEditingField(null);
  };

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
        className="absolute right-0 top-0 h-full w-[480px] bg-[#0D1D2D] border-l border-[#96C21A]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-[#96C21A]/20">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-[#E9E9E9]">Profile</h2>
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

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Profile Picture */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-[#0D1D2D]/50 border-2 border-[#96C21A]/20 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-[#96C21A]/10 flex items-center justify-center">
                      <span className="text-2xl text-[#96C21A]">
                        {formData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0D1D2D] border border-[#96C21A]/20 hover:bg-[#96C21A]/10"
                  >
                    <Camera className="w-4 h-4 text-[#96C21A]" />
                  </Button>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#E9E9E9]/80">Profile Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
                    <div className="space-y-1">
                      <div className="text-sm text-[#E9E9E9]/60">Name</div>
                      {editingField === 'name' ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <div className="text-sm text-[#E9E9E9]">{formData.name}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-[#96C21A]/10"
                      onClick={() => setEditingField(editingField === 'name' ? null : 'name')}
                    >
                      <Edit2 className="w-4 h-4 text-[#96C21A]" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
                    <div className="space-y-1">
                      <div className="text-sm text-[#E9E9E9]/60">Email</div>
                      {editingField === 'email' ? (
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <div className="text-sm text-[#E9E9E9]">{formData.email}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-[#96C21A]/10"
                      onClick={() => setEditingField(editingField === 'email' ? null : 'email')}
                    >
                      <Edit2 className="w-4 h-4 text-[#96C21A]" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
                    <div className="space-y-1">
                      <div className="text-sm text-[#E9E9E9]/60">Daily Review Goal</div>
                      {editingField === 'dailyGoal' ? (
                        <Input
                          type="number"
                          min="0"
                          max="999"
                          value={formData.dailyGoal}
                          onChange={(e) => handleInputChange('dailyGoal', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <div className="text-sm text-[#E9E9E9]">{formData.dailyGoal}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-[#96C21A]/10"
                      onClick={() => setEditingField(editingField === 'dailyGoal' ? null : 'dailyGoal')}
                    >
                      <Edit2 className="w-4 h-4 text-[#96C21A]" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#E9E9E9]/80">Change Password</h3>
                <div className="space-y-3">
                  <Input
                    type="password"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                  >
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Analytics */}
              <ProfileAnalytics />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};