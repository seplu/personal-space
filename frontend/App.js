import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Missing from "./components/Missing";
import Car from "./components/Car";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                {/* protected routes */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="admin" element={<Admin/>} />
                    <Route path="car" element={<Car/>} />
                </Route>
                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
