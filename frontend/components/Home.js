import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
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