// @ts-ignore
import React from 'react';
// @ts-ignore
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";

const root = ReactDOM.createRoot(document.querySelector("#application")!);
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
);
