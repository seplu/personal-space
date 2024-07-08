import React from "react";
import {Routes, Route} from "react-router-dom";
import Admin from "./components/Admin";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home/>} />
                    <Route path="admin" element={<Admin />} />
                </Route>
                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App;
