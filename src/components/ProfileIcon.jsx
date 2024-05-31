import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/ProfileIcon.css";

const ProfileIcon = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="profile-icon-container">
            <FaUserCircle size={30} onClick={toggleMenu} className="profile-icon" />
            {menuOpen && (
                <div className="profile-menu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
