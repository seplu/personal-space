import React from 'react';
import {
    IoCarSportOutline,
    IoCashOutline,
    IoHomeOutline,
    IoLibraryOutline,
    IoPulseOutline,
    IoRibbonOutline
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navigation navigation--inline">
            <ul>
                <li>
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                        <IoHomeOutline className="navigation-icon"/>
                        <span className="invisible">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/car" className={location.pathname === "/car" ? "active" : ""}>
                        <IoCarSportOutline className="navigation-icon"/>
                        <span className="invisible">Car</span>
                    </Link>
                </li>
                <li>
                    <Link to="/finance" className={location.pathname === "/finance" ? "active" : ""}>
                        <IoCashOutline className="navigation-icon"/>
                        <span className="invisible">Finance</span>
                    </Link>
                </li>
                <li>
                    <Link to="/health" className={location.pathname === "/health" ? "active" : ""}>
                        <IoPulseOutline className="navigation-icon"/>
                        <span className="invisible">Health</span>
                    </Link>
                </li>
                <li>
                    <Link to="/habits" className={location.pathname === "/habits" ? "active" : ""}>
                        <IoRibbonOutline className="navigation-icon"/>
                        <span className="invisible">Habits tracker</span>
                    </Link>
                </li>
                <li>
                    <Link to="/collection" className={location.pathname === "/collection" ? "active" : ""}>
                        <IoLibraryOutline className="navigation-icon"/>
                        <span className="invisible">Collection</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
