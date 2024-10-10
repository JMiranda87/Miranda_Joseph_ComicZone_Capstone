// src/components/SupportButton.tsx
// This component renders the sticky support button and popover

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface SupportButtonProps {
  isDarkMode: boolean;
}

const SupportButton: React.FC<SupportButtonProps> = ({ isDarkMode }) => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportAttachment, setSupportAttachment] = useState<File | null>(null);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support form submitted:', { supportName, supportEmail, supportMessage, supportAttachment });
    setSupportName('');
    setSupportEmail('');
    setSupportMessage('');
    setSupportAttachment(null);
    setIsSupportOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSupportAttachment(e.target.files[0]);
    }
  };

  return (
    <Popover open={isSupportOpen} onOpenChange={setIsSupportOpen}>
      <PopoverTrigger asChild>
        <Button
          className={`fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          aria-label="Open support chat"
        >
          <HelpCircle className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" side="top">
        <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-gray-100' : ''}>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="support-name" className={isDarkMode ? 'text-gray-100' : ''}>Name</Label>
                <Input
                  id="support-name"
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  required
                  className={isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email" className={isDarkMode ? 'text-gray-100' : ''}>Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  required
                  className={isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-message" className={isDarkMode ? 'text-gray-100' : ''}>How can we help?</Label>
                <Textarea
                  id="support-message"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  required
                  className={isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-attachment" className={isDarkMode ? 'text-gray-100' : ''}>Attachment</Label>
                <Input
                  id="support-attachment"
                  type="file"
                  onChange={handleFileChange}
                  className={isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : ''}
                />
              </div>
              <Button type="submit" className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default SupportButton;