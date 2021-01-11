import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import UserPhoto from "../../assets/user.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FilePicker } from "react-file-picker";
import axios, { post } from "axios";
import shp from "shpjs";
import Calendar from "../Calendar/Calendar";

function Sidebar(props) {
    const [sidebar, setSidebar] = useState(false);
    const [showAddParcelForm, setShowAddParcelForm] = useState(false);
    const [calendar, setCalendar] = useState(false);
    const [addParcelInfo, setAddParcelInfo] = useState("");
    const [profilePhotoSrc, setProfilePhotoSrc] = useState(
        "../../assets/user.svg"
    );
    const [selectedDate, setSelectedDate] = useState(new Date("08/15/2020"));

    const showSidebar = () => setSidebar(!sidebar);
    const showCalendar = () => setCalendar(!calendar);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const getDateString = (date) => {
        const dateString =
            date.getDate() +
            " " +
            months[date.getMonth()] +
            ", " +
            date.getFullYear();

        return dateString;
    };

    const handleOnChangeFile = (file) => {
        setAddParcelInfo(file.name);

        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            let arrayBuffer = new Uint8Array(reader.result);
            shp(arrayBuffer)
                .then(function (geojson) {
                    console.log(geojson);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    };

    return (
        <>
            <IconContext.Provider value={{ color: "#afaeab" }}>
                <div className="sidebar-container">
                    <div className="sidebar">
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaBars
                                onClick={showSidebar}
                                color="#494646"
                            />
                        </Link>
                        <Link
                            to="#"
                            className="menu-parcel-title"
                            onClick={showCalendar}
                        >
                            <h2>{getDateString(selectedDate)}</h2>
                        </Link>
                        <Link to="#" className="menu-search">
                            <FaIcons.FaSearch color="#494646" />
                        </Link>
                    </div>
                    {showCalendar ? (
                        <Calendar
                            datePickerIsOpen={calendar}
                            selectedDate={selectedDate}
                            changeSelectedDate={(date) => setSelectedDate(date)}
                        />
                    ) : null}
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle">
                            <div className="navbar-header">
                                <div className="navbar-profile">
                                    <div className="menu-bars navbar-profile-photo">
                                        <img alt="user" src={UserPhoto} />
                                    </div>
                                    <div className="navbar-profile-info">
                                        <h3 className="info-name">User Name</h3>
                                        <Link to="#" className="info-logout">
                                            Log out
                                        </Link>
                                    </div>
                                </div>
                                <Link
                                    to="#"
                                    className="menu-bars"
                                    onClick={showSidebar}
                                >
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </div>
                        </li>
                        <li className="nav-text title">
                            <h3>DEMO Farm</h3>
                            <p>6 parcels → 17 ha</p>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="nav-text add-parcel">
                            <Button
                                variant="light"
                                size="lg"
                                onClick={() =>
                                    setShowAddParcelForm(!showAddParcelForm)
                                }
                            >
                                <FaIcons.FaPlusCircle color="rgba(53, 50, 45, 0.9)" />
                                Add parcel
                            </Button>
                        </li>
                        {showAddParcelForm ? (
                            <li className="nav-text add-parcel">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Parcel name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter parcel name"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            APIA exported ZIP
                                        </Form.Label>
                                        <div className="upload-zip">
                                            <FilePicker
                                                extensions={["zip"]}
                                                onChange={(fileObject) =>
                                                    handleOnChangeFile(
                                                        fileObject
                                                    )
                                                }
                                                onError={(errMsg) => {
                                                    setAddParcelInfo(errMsg);
                                                }}
                                            >
                                                <Button variant="outline-secondary">
                                                    Add .zip
                                                </Button>
                                            </FilePicker>
                                            <span>{addParcelInfo}</span>
                                        </div>
                                    </Form.Group>
                                    <Button type="submit" variant="secondary">
                                        Upload
                                    </Button>
                                </Form>
                            </li>
                        ) : null}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;
