
import React from "react";
import {BrowserRouter as Router, Routes, Route} from  'react-router-dom';
import Register from "./pages/register";
import UserHome from "./pages/UserHome";
import ArtistHome from "./pages/ArtistHome";
import Login from "./pages/login";
import CreatAlbum from "./pages/CreateAlbum";
import CreateMusic from "./pages/createMusic";
import AlbumDetails from "./pages/AlbumDetails";
const App=()=>{
return (
  <Router>
    <Routes>
      <Route path= '/' element={<Register></Register>}></Route>
      <Route path="/login" element= {<Login></Login>}></Route>
      <Route path= "/home" element= {<UserHome></UserHome>}></Route>
      <Route path="/artist-home" element= {<ArtistHome></ArtistHome>}></Route>
      <Route path="/album" element= {<CreatAlbum></CreatAlbum>}></Route>
       <Route path="/create-music/:albumId" element={<CreateMusic></CreateMusic>}></Route>
       <Route path="/album/:albumId" element= {<AlbumDetails></AlbumDetails>}></Route>
    </Routes>
  </Router>
)
}

export default App;