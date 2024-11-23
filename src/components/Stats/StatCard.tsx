// src/components/Stats/StatCard.tsx
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex items-center p-6 rounded-lg shadow-md ${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`p-4 rounded-full ${
          theme === "dark" ? "bg-blue-600" : "bg-blue-500"
        } text-white mr-4`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
