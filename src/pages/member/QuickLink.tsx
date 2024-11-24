import { Copy, ExternalLink, Link2 } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { quickLink } from "../../apis/shortLinkApis";
import { ThemeContext } from "../../context/ThemeContext";

const QuickLink = () => {
  const { theme } = useContext(ThemeContext);
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await quickLink(url);
      if (response && response.data.errCode === 0) {
        toast.success("Shortened link created successfully");
        setShortCode(response.data.shortCode);
        setUrl("");
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.error("Quick link error:", error);
      toast.error("An error occurred while shortening the link");
    }
  };

  const handleCopy = () => {
    const shortLink = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortLink).then(
      () => {
        toast.success("Link copied to clipboard");
      },
      () => {
        toast.error("Failed to copy link");
      }
    );
  };

  const handleGoTo = () => {
    const shortLink = `${window.location.origin}/${shortCode}`;
    window.open(shortLink, "_blank");
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Link
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Quickly create shortened links
        </p>
      </div>

      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6`}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2">
                Enter URL to shorten
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                placeholder="https://example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Shorten URL
            </button>
          </div>
        </form>

        {shortCode && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              <span className="text-sm font-medium">
                {`${window.location.origin}/${shortCode}`}
              </span>
              <div className="space-x-2">
                <button
                  onClick={handleCopy}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Copy link"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  onClick={handleGoTo}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Go to link"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickLink;
