import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "./StatsSidebar.css";
import { IconContext } from "react-icons";
import WeatherCard from "../weather/WeatherCard";
import Plot from "../plot/Plot";

function StatsSidebar(props) {
    const values = [
        ["Sun Mar 01 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.48"],
        ["Mon Mar 02 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.48"],
        ["Tue Mar 03 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.57"],
        ["Wed Mar 04 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.48"],
        ["Thu Mar 05 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.52"],
        ["Fri Mar 06 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.58"],
        ["Sat Mar 07 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.53"],
        ["Sun Mar 08 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.57"],
        ["Mon Mar 09 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.55"],
        ["Tue Mar 10 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.46"],
        ["Wed Mar 11 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.49"],
        ["Thu Mar 12 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.51"],
        ["Fri Mar 13 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.42"],
        ["Sat Mar 14 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.43"],
        ["Sun Mar 15 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.44"],
        ["Mon Mar 16 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.49"],
        ["Tue Mar 17 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.48"],
        ["Wed Mar 18 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.45"],
        ["Thu Mar 19 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.48"],
        ["Fri Mar 20 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.57"],
        ["Sat Mar 21 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.57"],
        ["Sun Mar 22 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.46"],
        ["Mon Mar 23 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.54"],
        ["Tue Mar 24 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.54"],
        ["Wed Mar 25 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.45"],
        ["Thu Mar 26 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.50"],
        ["Fri Mar 27 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.55"],
        ["Sat Mar 28 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.45"],
        ["Sun Mar 29 2020 00:00:00 GMT+0200 (GMT+02:00)", "0.45"],
        ["Mon Mar 30 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.48"],
        ["Wed Apr 01 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.47"],
        ["Thu Apr 02 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.42"],
        ["Fri Apr 03 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.58"],
        ["Sat Apr 04 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.53"],
        ["Sun Apr 05 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.55"],
        ["Mon Apr 06 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.47"],
        ["Tue Apr 07 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.54"],
        ["Wed Apr 08 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.42"],
        ["Thu Apr 09 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.60"],
        ["Fri Apr 10 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.43"],
        ["Sat Apr 11 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.44"],
        ["Sun Apr 12 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.41"],
        ["Mon Apr 13 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.59"],
        ["Tue Apr 14 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.55"],
        ["Wed Apr 15 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.45"],
        ["Thu Apr 16 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.50"],
        ["Fri Apr 17 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.56"],
        ["Sat Apr 18 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.57"],
        ["Sun Apr 19 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.45"],
        ["Mon Apr 20 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.54"],
        ["Tue Apr 21 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.43"],
        ["Wed Apr 22 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.40"],
        ["Thu Apr 23 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.54"],
        ["Fri Apr 24 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.40"],
        ["Sat Apr 25 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.51"],
        ["Sun Apr 26 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.44"],
        ["Mon Apr 27 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.51"],
        ["Tue Apr 28 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.42"],
        ["Wed Apr 29 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.51"],
        ["Thu Apr 30 2020 00:00:00 GMT+0300 (GMT+03:00)", "0.56"],
    ];
    return (
        <IconContext.Provider value={{ color: "#afaeab" }}>
            <nav
                className={
                    props.isOpenStatsSidebar ? "nav-menu active" : "nav-menu"
                }
            >
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <div className="navbar-header">
                            <div className="navbar-profile">
                                <div className="navbar-profile-info">
                                    <h3
                                        style={{ marginLeft: "2rem" }}
                                        className="info-name"
                                    >
                                        Your parcel statistics
                                    </h3>
                                </div>
                            </div>
                            <Link
                                to="#"
                                className="menu-bars"
                                onClick={() => {
                                    props.showStatsSidebar();
                                }}
                            >
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </div>
                    </li>
                    <li className="nav-text title">
                        <h3>{props.parcelName}</h3>
                        <p>10 ha</p>
                    </li>
                    <WeatherCard parcelName={props.parcelName} />
                    <li
                        className="nav-text title"
                        style={{ marginTop: "2rem" }}
                    >
                        <h3>NDVI statistics over time</h3>
                    </li>
                    <Plot values={values} />
                </ul>
            </nav>
        </IconContext.Provider>
    );
}

export default StatsSidebar;
