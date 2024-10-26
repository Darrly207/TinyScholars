import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import IndexPage from "./pages";
import Business from "./pages/business";
import PackagesAndPrices from "./pages/packagesAndPrices";
import FeaturedGames from "./pages/featuredGames";
import LoginPage from "./pages/login";
import SignUp from "./pages/signUp";
import Support from "./pages/support";
import Home from "./pages/home";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      {/* Only render Header if not on the /home route */}
      {location.pathname !== "/home" && <Header />}

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/Business" element={<Business />} />
        <Route path="/PackagesAndPrices" element={<PackagesAndPrices />} />
        <Route path="/FeaturedGames" element={<FeaturedGames />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/support" element={<Support />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
};

// Wrap the App component with BrowserRouter
const AppWithRouter: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
