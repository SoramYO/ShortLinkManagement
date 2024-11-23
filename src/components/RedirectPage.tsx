import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RedirectPage() {
  const { shortCode } = useParams();

  useEffect(() => {
    if (shortCode) {
      const originalUrl = localStorage.getItem(shortCode);
      if (originalUrl) {
        window.location.href = originalUrl;
      }
    }
  }, [shortCode]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
}