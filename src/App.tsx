import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import IndexPage from "./pages";
import Business from "./pages/business";
import PackagesAndPrices from "./pages/packagesAndPrices";
import FeaturedGames from "./pages/featuredGames";
import LoginPage from "./pages/signIn";
import Signup from "./pages/signUp";
import Support from "./pages/support";
import Home from "./pages/home";

import GameLayout from "./pages/gameLayout";
import { FullscreenProvider } from "./context/fullScreenContext";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App: React.FC = () => {
  const location = useLocation();

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        {/* Only render Header if not on the /home route */}
        {location.pathname !== "/home" &&
          location.pathname !== "/GameLayout" && <Header />}

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Business" element={<Business />} />
          <Route path="/PackagesAndPrices" element={<PackagesAndPrices />} />
          <Route path="/FeaturedGames" element={<FeaturedGames />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/support" element={<Support />} />
          <Route path="/home" element={<Home />} />
          <Route path="/GameLayout" element={<GameLayout />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

const AppWithRouter: React.FC = () => (
  <BrowserRouter>
    <FullscreenProvider>
      <App />
    </FullscreenProvider>
  </BrowserRouter>
);

export default AppWithRouter;
