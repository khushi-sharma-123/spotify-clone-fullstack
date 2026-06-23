import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreatAlbum from "./CreateAlbum";
import Layout from "../components/Layout";


function ArtistHome() {
    const navigate = useNavigate();

    const [albums, setAlbums] = useState([]);

    const fetchAlbum = async () => {
        try {

            const res = await axios.get("http://localhost:3000/api/music/my-albums",
                {
                    withCredentials: true
                }

            );
            setAlbums(res.data.albums || res.data);
        }
        catch (err) {
            console.log("Error Fetching albums:", err)
           
   

        }

    }

    useEffect(() => {
        fetchAlbum();
    }, []);
    return (
        <>
        <Layout>
        <div className="page-container">
            <h1>Artist Dashboard</h1>
            <CreatAlbum onAlbumCreated={fetchAlbum} />
            <h2>My Albums</h2>
<div className="album-container">
            {albums.map((album) => (
                <div className="album-card"
                 key={album._id}
                    onClick={() => navigate(`/album/${album._id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <h3>{album.title}</h3>
                    <p>{album.Artist?.username}</p>
                    <button
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/create-music/${album._id}`);
            }}
        >
            Upload Song
        </button>
                </div>
            ))}
</div>
           </div> 
           </Layout>
        </>
    )
}

export default ArtistHome;
