import { ExternalLink, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ShortenerAPI } from '../types/api';

interface StoredLink {
  originalUrl: string;
  apiId?: string;
}

interface GetLinkPageProps {
  apis: ShortenerAPI[];
}

export default function GetLinkPage({ apis }: GetLinkPageProps) {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const shortCode = searchParams.get('code');
  const storedData = shortCode ? localStorage.getItem(`link_${shortCode}`) : null;
  const linkData: StoredLink | null = storedData ? JSON.parse(storedData) : null;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGetLink = () => {
    if (!linkData) return;

    if (linkData.apiId) {
      const api = apis.find(a => a.id === linkData.apiId);
      if (api) {
        // Construct the URL using the selected API's format
        const encodedUrl = encodeURIComponent(linkData.originalUrl);
        const finalUrl = `${api.url}${encodedUrl}`;
        window.location.href = finalUrl;
      }
    } else {
      // Direct redirect if no API is used
      window.location.href = linkData.originalUrl;
    }
  };

  if (!linkData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Link Not Found</h1>
          <p className="text-gray-600">The requested link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Get Your Link</h1>
          
          {/* Optional Advertisement Space */}
          <div className="mb-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-center text-gray-600">Advertisement Space</p>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Timer className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">Please wait {countdown} seconds</p>
          </div>

          <button
            onClick={handleGetLink}
            disabled={countdown > 0}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-md text-white font-medium ${
              countdown > 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            {countdown > 0 ? `Get Link (${countdown}s)` : 'Get Link'}
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Please wait for the countdown to complete</p>
            <p>Your link will be available shortly</p>
          </div>
        </div>
      </div>
    </div>
  );
}