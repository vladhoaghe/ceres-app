import React from "react";
import MyFuncSatMap from "../map/MyFuncSatMap";
import SatMap from "../map/SatMap";
import Sidebar from "../sidebar/Sidebar";

function Home() {
    return (
        <div className="home">
            <Sidebar/>
            <MyFuncSatMap></MyFuncSatMap> 
        </div>
    );
}

export default Home;
