import React from "react";

function VideoComponent() {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/watch?v=vWw7VblG18E&list=RDMMvWw7VblG18E&start_radio=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoComponent;
