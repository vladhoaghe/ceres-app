import React from "react";
import SatMap from "../map/SatMap";
import Sidebar from "../sidebar/Sidebar";

function Home() {
    return (
        <div className="home">
            <Sidebar />
            <SatMap></SatMap> 
        </div>
    );
}

export default Home;
