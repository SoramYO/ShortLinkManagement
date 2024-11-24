import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading";
import NavBarComponent from "./components/NavBar/NavBarComponent";
import { useLoading } from "./context/LoadingContext";
import { ThemeContext } from "./context/ThemeContext";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";
import ScrollToTop from "./utils/ScrollToTop";
function App() {
  const { theme } = useContext(ThemeContext);
  const { isLoading } = useLoading();
  useAxiosInterceptors();
  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {isLoading && <Loading />}
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
        theme="light"
        limit={3}
        style={{ zIndex: 9999 }}
      />
      <NavBarComponent />
      <main>
        <div className="mx-auto ">
          <ScrollToTop />
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
