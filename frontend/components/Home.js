import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/Axios";

const Home = () => {
    const navigate = useNavigate();

    const logout = async () => {
        await axios.post("/logout");
        navigate('/login');
    }

    return (
        <div className="grid-content-4">
            <div className="grid-item">
                1
            </div>
            <div className="grid-item">
                2
            </div>
            <div className="grid-item">
                3
                <br />
                <Link to="/admin">Go to the Admin page</Link>
            </div>
            <div className="grid-item">
                4
            </div>
            <div className="grid-item">
                5
            </div>
            <div className="grid-item">
                6
                <br/>
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Home
