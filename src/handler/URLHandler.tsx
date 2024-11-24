// src/components/URLHandler.tsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URLHandler = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortCode) {
      navigate("/");
      return;
    }

    // Store shortCode in localStorage for GetLinkPage to use
    localStorage.setItem("currentShortCode", shortCode);
    navigate("/getlink");
  }, [shortCode, navigate]);

  return null;
};

export default URLHandler;
