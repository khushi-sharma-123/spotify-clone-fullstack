import { createContext, useContext, useState } from "react";


const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audio] = useState(new Audio());
    const playSong = (song, songs = []) => {
        if (!song) return;
        if (songs.length > 0) {
            setPlaylist(songs);

            const index = songs.findIndex(
                (s) => s._id === song._id
            );

            setCurrentIndex(index);
        }
        audio.onended = () => {
            nextSong();
        };

        try {
            audio.src = song.uri;
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
            };
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime);
            };
            audio.play();

            setCurrentSong(song);
            setIsPlaying(true);

        }
        catch (err) {
            console.error("Play error:", err);
        }
    };
    const pauseSong = () => {
        audio.pause();
        setIsPlaying(false);
    };
    const togglePlay = () => {
        if (isPlaying) {
            pauseSong();
        } else if (currentSong) {
            audio.play();
            setIsPlaying(true);
        }
    };
    const nextsong = () => {
        if (currentIndex >= playlist.length - 1) return;
        const next = playlist[currentIndex + 1];
        setCurrentIndex(currentIndex + 1);
        audio.src = next.uri;
        audio.play();
        setCurrentSong(next);
        setIsPlaying(true);
    };
    const previoussong = () => {
        if (currentIndex <= 0) return;
        const prev = playlist[currentIndex - 1];
        setCurrentIndex(currentIndex - 1);
        audio.src = prev.uri;
        audio.play();
        setCurrentSong(prev);
        setIsPlaying(true);
    }
    return (
        <MusicContext.Provider
            value={{
                currentSong,
                isPlaying,
                playSong,
                pauseSong,
                togglePlay,
                audio,
                currentTime,
                duration,
                nextsong,
                previoussong,

            }}
        >{children}</MusicContext.Provider>
    )
}


export const useMusic = () => useContext(MusicContext);