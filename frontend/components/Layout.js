import React from "react";
import Header from "./Header";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <main>
            <div className="grid-container">
                <div className="grid-item header">
                    <Header/>
                </div>
                <div className="grid-item navbar">
                    <Navbar/>
                </div>
                <div className="grid-item content">
                    <h2>Content</h2>
                    <ProtectedRoutes/>
                </div>
                <div className="grid-item footer">
                    <Footer/>
                </div>
            </div>
        </main>
    )
}

export default Layout;
