import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Header from "./components/header";
import IndexPage from "./pages";
import Business from "./pages/business";
import PackagesAndPrices from "./pages/packagesAndPrices";
import FeaturedGames from "./pages/featuredGames";
import LoginPage from "./pages/login";
import SignUp from "./pages/signUp";
import Support from "./pages/support";
import Home from "./pages/home";

import GameLayout from "./pages/gameLayout";
import { FullscreenProvider } from "./context/fullScreenContext";
const App: React.FC = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      {/* Only render Header if not on the /home route */}
      {location.pathname !== "/home" && location.pathname !== "/GameLayout" && (
        <Header />
      )}

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/Business" element={<Business />} />
        <Route path="/PackagesAndPrices" element={<PackagesAndPrices />} />
        <Route path="/FeaturedGames" element={<FeaturedGames />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/support" element={<Support />} />
        <Route path="/home" element={<Home />} />
        <Route path="/GameLayout" element={<GameLayout />} />
      </Routes>
    </AuthProvider>
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
