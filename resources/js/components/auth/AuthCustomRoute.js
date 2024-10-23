import React from 'react';
import { Link } from 'react-router-dom';
import './AuthCustomRoute.scss';

const AuthCustomRoute = ({ route, text, buttonText }) => {
    return (
        <div className="AuthCustomRoute">
            <p>{text}</p>
            <Link to={route}>
                <button>{buttonText}</button>
            </Link>
        </div>
    )
}

export default AuthCustomRoute;
