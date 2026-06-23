import { useState } from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useMusic } from "../Context/MusicContext";
import { MusicProvider } from "../Context/MusicContext";


function AlbumDetails() {

    const {playSong}= useMusic();
    const { albumId } = useParams();
    const navigate = useNavigate();

    const [album, setAlbum] = useState(null);

    

    useEffect(() => {
        fetchAlbum();
    }, []);

    const fetchAlbum = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/music/albums/${albumId}`,
                {
                    withCredentials: true
                }
            );
            setAlbum(res.data.albums);
        } catch (err) {
            console.log(err);
            console.log(err.response?.status);
            console.log(err.response?.data);
        }
    }

    if (!album) return <h2>Loading...</h2>;
    return (
        <>
            <Layout>
                <div className="page-container">
                    <h1>{album.title}</h1>
                    <h2>songs</h2>
                    <div>
                        {
                            album?.musics?.map((song) => (
                                <div key={song._id}>
                                    <h3
                                        onClick={() =>playSong(song,album.musics)}
                                          className="song-item"
                                        style={{ cursor: "pointer" }}
                                    >
                                       <span>🎵 {song.title}</span> 
                                        <span>▶</span>
                                    </h3>
                                </div>

                            ))
                        }
                    </div>
                   
                </div>
            </Layout>
        </>
    )
}

export default AlbumDetails;