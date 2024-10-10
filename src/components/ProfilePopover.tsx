// src/components/ProfilePopover.tsx
// This component renders the profile popover

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from '@radix-ui/react-label';

interface ProfilePopoverProps {
  isDarkMode: boolean;
  isMobile?: boolean;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({ isDarkMode, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempted with:', { username, password });
    // Here you would typically handle the sign-in logic
    resetForm();
  };

  const resetForm = () => {
    setShowSignInForm(false);
    setUsername('');
    setPassword('');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const content = (
    <div className="flex flex-col space-y-4 p-4">
      <h4 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-gray-100' : 'text-blue-800'}`}>
        {showSignInForm ? 'Sign In' : 'Welcome to Comic Zone'}
      </h4>
      {showSignInForm ? (
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className={isDarkMode ? 'text-gray-200' : 'text-blue-800'}>Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-blue-900 border-blue-300'}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className={isDarkMode ? 'text-gray-200' : 'text-blue-800'}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-blue-900 border-blue-300'}`}
            />
          </div>
          <Button 
            type="submit"
            className={`w-full ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Sign In
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={resetForm}
            className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-blue-300 text-blue-800 hover:bg-blue-100'}`}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <Button 
            onClick={() => setShowSignInForm(true)}
            className={`w-full ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Sign In
          </Button>
          <Button 
            variant="outline"
            className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-blue-300 text-blue-800 hover:bg-blue-100'}`}
          >
            Sign Up
          </Button>
          <div className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>
        </>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className={`rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
        {content}
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button  
          className="focus:outline-none transition-transform hover:scale-110"
          aria-label="User profile"
        >
          <User className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-72 p-0 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'}`}>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;