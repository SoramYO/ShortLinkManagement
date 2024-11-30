import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.tsx";

const CustomToastContainer = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "dark" ? "dark" : "light"}
            limit={3}
            className="fixed top-0 right-0"
            style={{
                zIndex: 99999,
                marginTop: "60px",
            }}
        />
    );
};

export default CustomToastContainer;