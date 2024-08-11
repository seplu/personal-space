import React from 'react'
import {
    IoCarSportOutline,
    IoCashOutline,
    IoHomeOutline,
    IoLibraryOutline,
    IoPulseOutline,
    IoRibbonOutline
} from "react-icons/io5";

function Navbar() {
    return (
        <nav className="navigation navigation--inline">
            <ul>
                <li>
                    <a href="#">
                        <IoHomeOutline className="navigation-icon"/>
                        <span className="invisible">Home</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <IoCarSportOutline className="navigation-icon"/>
                        <span className="invisible">Car</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <IoCashOutline className="navigation-icon"/>
                        <span className="invisible">Finance</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <IoPulseOutline className="navigation-icon"/>
                        <span className="invisible">Health</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <IoRibbonOutline className="navigation-icon"/>
                        <span className="invisible">Habits tracker</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <IoLibraryOutline className="navigation-icon"/>
                        <span className="invisible">Collection</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
