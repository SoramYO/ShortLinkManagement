import { Link } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import type { ShortenerAPI } from '../types/api';

interface URLShortenerProps {
  apis: ShortenerAPI[];
}

interface StoredLink {
  originalUrl: string;
  apiId?: string;
}

export default function URLShortener({ apis }: URLShortenerProps) {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const activeAPIs = apis.filter(api => {
      if (!api.active) return false;
      
      if (api.schedule.enabled) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [startHour, startMinute] = api.schedule.startTime.split(':').map(Number);
        const [endHour, endMinute] = api.schedule.endTime.split(':').map(Number);
        const startTimeMinutes = startHour * 60 + startMinute;
        const endTimeMinutes = endHour * 60 + endMinute;
        
        return currentTime >= startTimeMinutes && currentTime <= endTimeMinutes;
      }
      
      return true;
    });

    try {
      const shortCode = generateShortCode();
      let selectedApiId: string | undefined;

      // Sort by priority and randomize within same priority if there are active APIs
      if (activeAPIs.length > 0) {
        const sortedAPIs = activeAPIs.sort((a, b) => {
          if (a.priority === b.priority) {
            return Math.random() - 0.5;
          }
          return a.priority - b.priority;
        });
        selectedApiId = sortedAPIs[0].id;
      }

      // Store link data
      const linkData: StoredLink = {
        originalUrl: url,
        apiId: selectedApiId
      };
      localStorage.setItem(`link_${shortCode}`, JSON.stringify(linkData));

      const shortUrl = `${window.location.origin}/getlink?code=${shortCode}`;
      setShortUrl(shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error('Failed to shorten URL');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <Link className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">URL Shortener</h2>
      </div>

      <form onSubmit={handleShorten} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Enter URL to shorten</label>
          <input
            type="url"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Link className="w-4 h-4 mr-2" />
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Shortened URL</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              readOnly
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border-gray-300 bg-gray-50"
              value={shortUrl}
            />
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                toast.success('URL copied to clipboard!');
              }}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}