import { useEffect, useRef, useState } from "react";
import bgImage from "./assets/bg.jpg.jpg";
import albumCover from "./assets/album.jpg";

// Import songs
import song1 from "./assets/1.Free.mp3";
import song2 from "./assets/2.Sensational.mp3";
import song3 from "./assets/3.winin.mp3";
import song4 from "./assets/4.Last 90's baby.mp3";
import song5 from "./assets/5.pitchforks and torches.mp3";
import song6 from "./assets/6.Believe.mp3";
import song7 from "./assets/7.Regardless.mp3";
import song8 from "./assets/8.Holiday.mp3";
import song9 from "./assets/9.Hold up.mp3";
import song10 from "./assets/10.Love it.mp3";
import song11 from "./assets/11.Watch my back.mp3";
import song12 from "./assets/12.Hope.mp3";

import "./App.css";

function MusicApp() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [albumPurchased, setAlbumPurchased] = useState(false);

  const songs = [
    { name: "Free", file: song1 },
    { name: "Sensational", file: song2 },
    { name: "Winin", file: song3 },
    { name: "Last 90's baby", file: song4 },
    { name: "Pitchforks and torches", file: song5 },
    { name: "Believe", file: song6 },
    { name: "Regardless", file: song7 },
    { name: "Holiday", file: song8 },
    { name: "Hold up", file: song9 },
    { name: "Love it", file: song10 },
    { name: "Watch my back", file: song11 },
    { name: "Hope", file: song12 },
  ];

  const [currentSong, setCurrentSong] = useState(songs[0].file);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction.");
      });
    }
  }, [currentSong]);

  // Handle query parameters for payment success/cancel
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Payment was successful! Downloads are unlocked.");
      setAlbumPurchased(true);
    }
    if (query.get("canceled")) {
      console.log("Payment was canceled.");
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // ---------------- STRIPE ----------------
  const handleStripeCheckout = async () => {
    try {
      const response = await fetch("https://ZaphieZaps.github.io/martian-haze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();

      if (session.url) {
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("❌ Error initiating Stripe checkout:", error);
      alert("⚠️ Error: Could not start checkout. Please try again.");
    }
  };
  // ----------------------------------------

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
        flexDirection: "column",
      }}
    >
      <div className="overlay">
        <h1>🌌 Martian Haze 🌌</h1>
        <p>Welcome to the music universe.</p>

        {/* Controls */}
        <div style={{ marginBottom: "15px" }}>
          <button onClick={() => audioRef.current.play()}>▶️ Play</button>
          <button onClick={toggleMute}>{isMuted ? "🔇 Unmute" : "🔊 Mute"}</button>
          <button onClick={stopMusic}>⏹️ Stop</button>
        </div>

        {/* Album cover */}
        <img
          src={albumCover}
          alt="Album cover"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        />

        {/* Playlist */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
            maxWidth: "300px",
            margin: "0 auto",
          }}
        >
          {songs.map((s, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                padding: "6px 10px",
                borderRadius: "8px",
                backgroundColor: currentSong === s.file ? "#ff006e" : "rgba(255,255,255,0.1)",
                color: currentSong === s.file ? "#fff" : "#ddd",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onClick={() => setCurrentSong(s.file)}
            >
              <span style={{ flexGrow: 1 }}>
                {index + 1}. {s.name}
              </span>
              {albumPurchased && (
                <a
                  href={s.file}
                  download
                  style={{
                    marginLeft: "10px",
                    fontSize: "14px",
                    color: "#0f0",
                  }}
                >
                  ⬇️
                </a>
              )}
              {currentSong === s.file && <span style={{ marginLeft: "10px" }}>🎵</span>}
            </div>
          ))}
        </div>

        {/* Stripe Button */}
        {!albumPurchased && (
          <div style={{ marginTop: "20px" }}>
            <h3>Buy Full Album – $0.01</h3>
            <button onClick={handleStripeCheckout} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#6772E5', color: 'white' }}>
                Pay with Card
            </button>
          </div>
        )}

        <audio ref={audioRef} src={currentSong} loop />
      </div>
    </div>
  );
}

export default MusicApp;