import axios from "axios";
import React,{useState} from "react";



function CreatAlbum({onAlbumCreated}){

    const[title, setTitle]= useState("");

    const handleSubmit= async(e)=>{
        e.preventDefault();

        const data= {title};

        // const formData= new FormData(e.target);
        // const data= Object.fromEntries(formData.entries());

        // const token = localStorage.getItem("token");
        // console.log("TOKEN", token)
        const response= await axios.post("http://localhost:3000/api/music/album",
             data,
             {
                withCredentials:true
             }
            );
         
        alert("album created");

        setTitle("");

        //IMPORTENT: TELL PARENT DASHBOARD TO REFRESH
        if(onAlbumCreated){
            onAlbumCreated();
        }


    }


    return (
        <>
        <section>
            <h1>Create Album</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                value={title}
                name="title"
                placeholder="Album Title" 
                onChange={(e)=>setTitle(e.target.value)}
                required></input>
                <button type="submit">create album</button>
            </form>
        </section>
        </>
    )
}

export default CreatAlbum;