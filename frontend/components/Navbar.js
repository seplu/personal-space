import React from 'react'
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Main</Link>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/car">Car</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
