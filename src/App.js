import { useEffect, useRef, useState } from "react";
import bgImage from "./assets/bg.jpg.jpg";
import song from "./assets/song.mp3.mp3";
import "./App.css";

function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Try autoplay (may be blocked until user interacts)
    audioRef.current.play().catch(() => {
      console.log("Autoplay blocked. Waiting for user interaction.");
    });
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="overlay">
        <h1>🌌 Martian Haze 🌌</h1>
        <p>Welcome to the other side of the universe.</p>

        <button onClick={() => audioRef.current.play()}>▶️ Play Music</button>
        <button onClick={toggleMute}>
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>

        <audio ref={audioRef} src={song} loop />
      </div>
    </div>
  );
}

export default App;
