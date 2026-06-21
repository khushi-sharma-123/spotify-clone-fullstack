import { useState } from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AlbumDetails(){
    const{albumId}= useParams();
    const navigate= useNavigate();

    const [album, setAlbum]= useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    useEffect(()=>{
        fetchAlbum();
    },[]);

    const fetchAlbum= async()=>{
        try{
           const res = await axios.get(
                `http://localhost:3000/api/music/albums/${albumId}`,
                {
                    withCredentials: true
                }
           );
        setAlbum(res.data.albums);
        }catch(err){
            console.log(err);
        }
    }

        if (!album) return <h2>Loading...</h2>;
    return(
        <>
        <h1>{album.title}</h1>
        <h2>songs</h2>
       <div>
        {
            album?.musics?.map((song)=>(
                <div key={song._id}>
                    <h3
                    onClick={() => setCurrentSong(song)}
    style={{ cursor: "pointer" }}
                    >
                       🎵 {song.title}  
                    </h3>
                </div>

            ))
        }
       </div>
       {
    currentSong && (
        <div>
            <h3>Now Playing: {currentSong.title}</h3>

            <audio
                controls
                autoPlay
                src={currentSong.uri}
            />
        </div>
    )
}
      
        </>
    )
}

export default AlbumDetails;