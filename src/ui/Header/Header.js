import React from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

const Header = props => {
    return (
        <ul className={'Header'}>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
                <NavLink to="/about">Sign in</NavLink>
            </li>
        </ul>
    )
}

export default Header;