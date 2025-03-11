import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import DashBoard from "./pages/dashboard/DashBoard";
import Help from "./pages/help/Help";
import Search from "./pages/search/Search";
import Offers from "./pages/offers/Offers";
import Cart from "./pages/cart/Cart";
import Favourites from "./pages/favourites/Favourites";
import Orders from "./pages/orders/Orders";

function App() {
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      setAddress(response.data);
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  const handleSessionOut = () => {
    localStorage.removeItem("session-id");
    localStorage.removeItem("token");
    navigate('/LogIn', { replace: true });
  };

  const ProtectedRoutes = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    const expirationTime = localStorage.getItem("session-id");
    if (isAuthenticated) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expirationTime)) {
        return (
          <div className="flex items-center justify-center h-screen w-full">
            <section className="flex items-center h-full bg-gray-900 text-gray-100 w-full">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-40 h-40 text-gray-600"
                >
                  <path
                    fill="currentColor"
                    d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                  ></path>
                  <rect
                    width="176"
                    height="32"
                    x="168"
                    y="320"
                    fill="currentColor"
                  ></rect>
                  <polygon
                    fill="currentColor"
                    points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                  ></polygon>
                  <polygon
                    fill="currentColor"
                    points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                  ></polygon>
                </svg>
                <p className="text-3xl">Session Time-Out.</p>
                <button
                  type="button"
                  className="items-center justify-center w-full px-8 py-3 font-semibold rounded-md bg-violet-200 text-gray-900 hover:bg-violet-300 active:bg-violet-300 btnall"
                  onClick={handleSessionOut}
                >
                  Come Again
                </button>
              </div>
            </section>
          </div>
        );
      } else {
        return children;
      }
    } else {
      return <Navigate to="/LogIn" replace />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/LogIn" />} />
      <Route path="/LogIn" element={<LogIn location={address} />} />
      <Route path="/SignUp" element={<SignUp location={address} />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/*" element={<Navigate to="/PageNotFound" />} />
      <Route path="/PageNotFound" element={<PageNotFound />} />

      <Route
        path="/DashBoard"
        element={
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/Help"
        element={
          <ProtectedRoutes>
            <Help />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/Search"
        element={
          <ProtectedRoutes>
            <Search />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/Offers"
        element={
          <ProtectedRoutes>
            <Offers />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/Cart"
        element={
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/Favourites"
        element={
          <ProtectedRoutes>
            <Favourites />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/Orders"
        element={
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
