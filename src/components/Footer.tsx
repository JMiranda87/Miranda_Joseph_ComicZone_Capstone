// src/components/Footer.tsx
// This component renders the footer of the application

import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Send } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className={`w-full py-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-800 text-white'}`}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">Comic Zone is your one-stop shop for all things comics. From new releases to rare back issues, we've got you covered.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-300">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-blue-300">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm hover:text-blue-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-blue-300">Terms of Service</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">123 Comic Lane</p>
            <p className="text-sm">Gotham City, NY 10001</p>
            <p className="text-sm">Phone: (555) 123-4567</p>
            <p className="text-sm">Email: info@comiczone.com</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Join Our Mailing List</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600' : 'bg-white text-blue-900 placeholder-blue-400 border-blue-300'}`}
              />
              <Button type="submit" className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-500">
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs mt-2">Stay updated with our latest releases and exclusive offers!</p>
          </div>
        </div>
        <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-blue-700'} flex flex-col md:flex-row justify-between items-center`}>
          <p className="text-sm text-center md:text-left">&copy; 2024 Comic Zone. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" aria-label="Facebook" className="hover:text-blue-300">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-300">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-300">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;