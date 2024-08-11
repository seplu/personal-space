import React from 'react';
import {IoFingerPrint} from "react-icons/io5";

function Header() {
    return (
        <div className="header">
            <div className="logo">Logo</div>
            <div className="right-section">
                <div className="profile-icon">
                    <IoFingerPrint className="navigation-icon"/>
                    <span>
                        Profile
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Header;
