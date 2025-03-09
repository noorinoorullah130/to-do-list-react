import React from "react";
import sunIcon from "../assets/images/icon-sun.svg";

const Header = () => {
    return (
        <div className="header">
            <h1>TODO</h1>
            <img src={sunIcon} alt="sun icon" />
        </div>
    );
};

export default Header;
