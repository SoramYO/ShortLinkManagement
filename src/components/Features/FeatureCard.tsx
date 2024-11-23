// src/components/Features/FeatureCard.tsx
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="mb-4 text-blue-500">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;
