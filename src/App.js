import { useEffect, useRef, useState } from "react";
import bgImage from "./assets/bg.jpg.jpg";
import albumCover from "./assets/album.jpg";

// Import all songs
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

function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const songs = [
    { name: "Free", file: song1, album: albumCover },
    { name: "Sensational", file: song2, album: albumCover },
    { name: "Winin", file: song3, album: albumCover },
    { name: "Last 90's baby", file: song4, album: albumCover },
    { name: "Pitchforks and torches", file: song5, album: albumCover },
    { name: "Believe", file: song6, album: albumCover },
    { name: "Regardless", file: song7, album: albumCover },
    { name: "Holiday", file: song8, album: albumCover },
    { name: "Hold up", file: song9, album: albumCover },
    { name: "Love it", file: song10, album: albumCover },
    { name: "Watch my back", file: song11, album: albumCover },
    { name: "Hope", file: song12, album: albumCover },
  ];

  const [currentSong, setCurrentSong] = useState(songs[0].file);
  const [currentAlbum, setCurrentAlbum] = useState(songs[0].album);

  useEffect(() => {
    audioRef.current.play().catch(() => {
      console.log("Autoplay blocked. Waiting for user interaction.");
    });
  }, [currentSong]);

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

        <div style={{ marginBottom: "15px" }}>
          <button onClick={() => audioRef.current.play()}>▶️ Play Music</button>
          <button onClick={toggleMute}>
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>
          <button onClick={stopMusic}>⏹️ Stop Music</button>
        </div>

        <img
          src={currentAlbum}
          alt="Album cover"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        />

        {/* Numbered vertical playlist */}
        <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "300px", margin: "0 auto" }}>
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
              onClick={() => {
                setCurrentSong(s.file);
                setCurrentAlbum(s.album);
                audioRef.current.play();
              }}
            >
              <span style={{ flexGrow: 1 }}>{index + 1}. {s.name}</span>
              {currentSong === s.file && <span style={{ marginLeft: "10px" }}>🎵</span>}
            </div>
          ))}
        </div>

        <audio ref={audioRef} src={currentSong} loop />
      </div>
    </div>
  );
}

export default App;
