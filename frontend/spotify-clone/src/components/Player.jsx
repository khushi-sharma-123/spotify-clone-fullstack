
import { useMusic } from "../Context/MusicContext";

function Player() {
  const { currentSong, isPlaying, togglePlay, currentTime, duration, audio ,nextsong, previoussong} = useMusic();
  const formatTime = (time) => {
    if (!time) return "0.00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;

  };

  if (!currentSong) return null;

  return (
    <div className="music-player"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "15px",
        background: "#181818",
        color: "white",
          borderTop: "1px solid #333",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4>{currentSong.title}</h4>
      </div>
      <div  style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <span>{formatTime(currentTime)}</span>
        <input type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            const time = Number(e.target.value);

            audio.currentTime = time;
            // setCurrentTime(time);
          }}
        ></input>
        <span>{formatTime(duration)}</span>
      </div>
       <button onClick={previoussong}>⏮</button>
      <button onClick={togglePlay}>
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
       <button onClick={nextsong}>⏮</button>
      {/* <p>
        {Math.floor(currentTime)} / {Math.floor(duration)} sec
      </p> */}
    </div>
  );
}

export default Player;

