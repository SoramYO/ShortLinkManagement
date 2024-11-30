import { useContext } from "react";
import { Outlet } from "react-router-dom";
import CustomToastContainer from "./components/CustomToastContainer";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading";
import NavBarComponent from "./components/NavBar/NavBarComponent";
import { useLoading } from "./context/LoadingContext";
import { LoadingProvider } from './context/LoadingContext';
import { ThemeContext } from "./context/ThemeContext";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";
import ScrollToTop from "./utils/ScrollToTop";
import LoadingOverlay from './components/common/LoadingOverlay';

function App() {
  const { theme } = useContext(ThemeContext);
  const { isLoading } = useLoading();
  useAxiosInterceptors();
  return (
    <LoadingProvider>
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <CustomToastContainer />
        <LoadingOverlay />
        {isLoading && <Loading />}
        <NavBarComponent />
        <main>
          <div className="mx-auto ">
            <ScrollToTop />
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </LoadingProvider>
  );
}

export default App;
