// src/components/GetLinkPage.tsx
import { useEffect, useState } from "react";
import { getOriginalUrl } from "../../apis/shortLinkApis";

const GetLinkPage = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGetLink = async () => {
    const shortCode = localStorage.getItem("currentShortCode");
    if (!shortCode) return;

    try {
      const response = await getOriginalUrl(shortCode);
      console.log(response);
      if (response?.data?.originalUrl) {
        window.open(response.data.originalUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Error getting original URL:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Get Your Link</h2>
          <p className="mt-2 text-gray-600">
            Wait {countdown} seconds before accessing your link
          </p>
        </div>

        <button
          onClick={handleGetLink}
          disabled={countdown > 0}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-md text-white font-medium ${
            countdown > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {countdown > 0 ? `Wait ${countdown}s` : "Get Link"}
        </button>
      </div>
    </div>
  );
};

export default GetLinkPage;
