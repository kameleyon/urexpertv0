import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useAuthActions } from '@/features/auth/hooks/useAuth';
import { Button } from '../ui/button/Button';
import { Settings, LogOut, Image as ImageIcon, Paperclip, Send, Download, Copy, RotateCcw, X, UserCircle, Edit2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateUMReview } from '@/lib/api/openRouter';
import { SettingsPanel } from '../settings/SettingsPanel';
import { ProfilePanel } from '../profile/ProfilePanel';
import { typeText } from '@/lib/utils/typewriter';

export default function Dashboard() {
  const { state: { user } } = useAuth();
  const { logout } = useAuthActions();
  const [message, setMessage] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [editableTranscript, setEditableTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (message.trim()) {
      try {
        setIsGenerating(true);
        setShowTranscript(true);
        setTranscript('Generating your review...');
        
        const generatedReview = await generateUMReview(message);
        if (generatedReview) {
          setTranscript('');
          await typeText(generatedReview, (text) => {
            setTranscript(text);
          });
          setEditableTranscript(generatedReview);
        }
        setMessage('');
      } catch (error) {
        console.error('Error generating review:', error);
        setTranscript('Failed to generate review. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      try {
        const text = await file.text();
        setMessage(prev => prev + (prev ? '\n\n' : '') + text);
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file. Please try again.');
      }
    }
    event.target.value = ''; // Reset input
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should not exceed 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload only image files');
        return;
      }

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        setMessage(prev => prev + (prev ? '\n\n' : '') + `[Image: ${file.name}]\n${base64}`);
      } catch (error) {
        console.error('Error reading image:', error);
        alert('Error reading image. Please try again.');
      }
    }
    event.target.value = ''; // Reset input
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditableTranscript(transcript);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setTranscript(editableTranscript);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
        e.preventDefault();
        handleSend();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#101F28] to-[#1D324B] flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/urexpertlogo.png" alt="URExpert Logo" className="h-20" />
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-[#E9E9E9]/60">{user?.email}</span>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#96C21A]/10"
              onClick={() => setShowProfile(true)}
              aria-label="Profile"
            >
              <UserCircle className="w-5 h-5 text-[#96C21A]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#96C21A]/10"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-[#96C21A]" />
            </Button>
            <Button
              onClick={logout}
              variant="ghost"
              size="icon"
              className="hover:bg-[#96C21A]/10"
              aria-label="Log out"
            >
              <LogOut className="w-5 h-5 text-[#96C21A]" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className={`transition-all duration-500 ease-out transform ${showTranscript ? 'w-1/2 pr-6' : 'w-full'} flex flex-col items-center`}>
          <h1 className="text-4xl font-light text-[#E9E9E9] mb-8">Hello there, how can I help?</h1>
          <div className="w-full max-w-2xl">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add your patient's chart"
                className="w-full h-32 bg-[#0D1D2D]/30 border border-[#96C21A]/20 rounded-lg p-4 text-[#E9E9E9] placeholder:text-[#E9E9E9]/30 focus:outline-none focus:border-[#96C21A] transition-all duration-300"
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#96C21A]/10"
                  onClick={() => imageInputRef.current?.click()}
                  aria-label="Attach image"
                >
                  <ImageIcon className="w-4 h-4 text-[#96C21A]" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.md,.doc,.docx,.pdf"
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#96C21A]/10"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach file"
                >
                  <Paperclip className="w-4 h-4 text-[#96C21A]" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#96C21A]/10"
                  onClick={handleSend}
                  disabled={!message.trim() || isGenerating}
                >
                  <Send className="w-4 h-4 text-[#96C21A]" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-1/2 h-[calc(100vh-12rem)] bg-[#0D1D2D]/30 rounded-lg border border-[#96C21A]/20 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-300 text-[#E9E9E9]">Generated UM Review</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#96C21A]/10"
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([transcript], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = `UM_Review_${new Date().toISOString()}.txt`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                  >
                    <Download className="w-4 h-4 text-[#96C21A]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#96C21A]/10"
                    onClick={() => navigator.clipboard.writeText(transcript)}
                  >
                    <Copy className="w-4 h-4 text-[#96C21A]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#96C21A]/10"
                    onClick={handleSend}
                    disabled={isGenerating}
                  >
                    <RotateCcw className="w-4 h-4 text-[#96C21A]" />
                  </Button>
                  {isEditing ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-[#96C21A]/10"
                      onClick={handleSaveEdit}
                    >
                      <Save className="w-4 h-4 text-[#96C21A]" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-[#96C21A]/10"
                      onClick={handleEdit}
                    >
                      <Edit2 className="w-4 h-4 text-[#96C21A]" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#96C21A]/10"
                    onClick={() => setShowTranscript(false)}
                  >
                    <X className="w-4 h-4 text-[#96C21A]" />
                  </Button>
                </div>
              </div>
              <div className="h-[calc(100vh-20rem)] overflow-y-auto scrollbar-thin text-[#E9E9E9]/60 text-sm whitespace-pre-wrap px-4">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#96C21A]"></div>
                  </div>
                ) : isEditing ? (
                  <textarea
                    value={editableTranscript}
                    onChange={(e) => setEditableTranscript(e.target.value)}
                    className="w-full h-full bg-transparent border-none focus:outline-none resize-none text-sm text-[#E9E9E9]/60 scrollbar-thin"
                  />
                ) : (
                  transcript
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}
        {showProfile && (
          <ProfilePanel onClose={() => setShowProfile(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}