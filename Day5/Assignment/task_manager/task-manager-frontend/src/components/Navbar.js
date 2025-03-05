import React from "react";

const Navbar = ({ token, onLogout }) => {
    return (
        <nav className="navbar">
            <h2 className="logo">Task Manager</h2>
            {token && <button onClick={onLogout} className="logout-btn">Logout</button>}
        </nav>
    );
};

export default Navbar;
