import React from "react";
import backgroundImage from "../assets/reflection.avif";
const IndexPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        maxHeight: "90%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default IndexPage;
