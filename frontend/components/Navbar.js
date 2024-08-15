import React from 'react'
import {
    IoCarSportOutline,
    IoCashOutline,
    IoHomeOutline,
    IoLibraryOutline,
    IoPulseOutline,
    IoRibbonOutline
} from "react-icons/io5";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="navigation navigation--inline">
            <ul>
                <li>
                    <Link to="/">
                        <IoHomeOutline className="navigation-icon"/>
                        <span className="invisible">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/car">
                        <IoCarSportOutline className="navigation-icon"/>
                        <span className="invisible">Car</span>
                    </Link>
                </li>
                <li>
                    <Link to="/finance">
                        <IoCashOutline className="navigation-icon"/>
                        <span className="invisible">Finance</span>
                    </Link>
                </li>
                <li>
                    <Link to="/health">
                        <IoPulseOutline className="navigation-icon"/>
                        <span className="invisible">Health</span>
                    </Link>
                </li>
                <li>
                    <Link to="/habits">
                        <IoRibbonOutline className="navigation-icon"/>
                        <span className="invisible">Habits tracker</span>
                    </Link>
                </li>
                <li>
                    <Link to="/collection">
                        <IoLibraryOutline className="navigation-icon"/>
                        <span className="invisible">Collection</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
