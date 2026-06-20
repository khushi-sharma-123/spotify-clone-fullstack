import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

 function CreateMusic(){
    const {albumId}= useParams();
    const [title, setTitle] = useState("");
    const[file,setFile]= useState(null);

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const formData= new FormData();
        formData.append("title", title);
        formData.append('music',file);
        formData.append("albumId", albumId);

    
try{
   const res = await axios.post("http://localhost:3000/api/music/create-music",
    formData,
    {
        withCredentials:true
    }
);
console.log(res.data)
}catch(err){
console.log(err.response?.data)
}
}  
    return(


        <>
        <section>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                     name="title"
                      placeholder="Song title" 
                      value={title}
                      required
                      onChange={(e)=>setTitle(e.target.value)}
                ></input>
                <input 
                type="file" 
                name="music"
                 accept="audio/*"
                 onChange={(e)=>setFile(e.target.files[0])}
                 >
                </input>
                <button type="submit">Upload song</button>
            </form>
        </section>
        </>
    )
}

export default CreateMusic;
