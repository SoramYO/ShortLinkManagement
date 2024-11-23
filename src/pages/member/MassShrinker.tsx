import { Link2 } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const MassShrinker = () => {
  const { theme } = useContext(ThemeContext);
  const [urls, setUrls] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement mass link shortening
    console.log("Shortening URLs:", urls.split("\n"));
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Mass Shrinker
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Shorten multiple URLs at once (up to 30)
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
              <label htmlFor="urls" className="block text-sm font-medium mb-2">
                Enter URLs (one per line)
              </label>
              <textarea
                id="urls"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                rows={10}
                placeholder="https://example.com&#10;https://another-example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Shorten URLs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MassShrinker;
