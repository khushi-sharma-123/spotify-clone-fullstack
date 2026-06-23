import Navbar from "./Navbar";
 import Sidebar from "./Sidebar";

 function Layout({children}){
    return (
        <div>
            <Navbar/>
            <div className="app-layout">
            <Sidebar/>
            <div className="main-content">
                {children}
            </div>
        </div>
        </div>
    )
 }
 export default Layout;