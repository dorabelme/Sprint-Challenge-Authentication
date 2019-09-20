import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';



class Navbar extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <div className="navbar">
                <div className="navbar-right">
                    <Link to="/login" className="links">Login</Link>
                    <Link to="/register" className="links">Register</Link>

                </div>
            </div>
        )
    }
}

export default Navbar;


