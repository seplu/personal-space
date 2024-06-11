// @ts-ignore
import React from 'react';
// @ts-ignore
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Car from "./pages/car";
import Dashboard from "./pages/dashboard";

const root = ReactDOM.createRoot(document.querySelector("#application")!);
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/car" element={<Car />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
);
