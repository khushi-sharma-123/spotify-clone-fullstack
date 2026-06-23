import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function UserHome() {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchAlbums();
    }, []);
    const fetchAlbums = async () => {
        try {

            const res = await axios.get("http://localhost:3000/api/music/albums",
                {
                    withCredentials: true,
                }
            )
            // console.log(res.data);
            console.log(res.data.albums[0]);
            setAlbums(res.data.albums)
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
        <Layout>
        <div className="page-container">
            <h1>Welcome User</h1>
            <div className="album-container">
                {albums.map((albums)=>(
                <div
                    key={albums._id}
                    onClick={() => navigate(`/album/${albums._id}`)}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        margin: "10px",
                        cursor: "pointer"
                    }}
                >
                    <h3>{albums.title}</h3>
                </div>
        ))}
            </div>
</div>
</Layout>
        </>
    )

}
export default UserHome;