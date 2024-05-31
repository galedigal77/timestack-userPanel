import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post('/users/logout');
                localStorage.removeItem('token');
                navigate('/');
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
