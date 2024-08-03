import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "../api/Axios";

const Home = () => {
    const navigate = useNavigate();

    const logout = async () => {
        await axios.post("/logout");
        navigate('/login');
    }

    return (
        <section>
            <Navbar />
            <br />
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <br />
            <div>
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
