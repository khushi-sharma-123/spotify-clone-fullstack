// import { Link } from "react-router-dom";

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2>Spotify Clone</h2>

//       <Link to="/"> Home</Link>
//       <Link to="/artist-home">🎤 Artist Dashboard</Link>
//     </div>
//   );
// }

// export default Sidebar;

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/home">🏠 Home</Link>
      <Link to="/artist-home">🎤 Artist Dashboard</Link>
    </div>
  );
}

export default Sidebar;