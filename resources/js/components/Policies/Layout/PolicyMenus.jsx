import React from 'react';
import { NavLink } from 'react-router-dom';

const PolicyMenus = () => {
    return (
        <div className='policy__menus'>
            <ul role="navigation" className='__navigation'>
                <li>
                    <NavLink exact activeClassName="active" to={`/privacy-policy`} >Privacy</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to={`/terms`} >Terms</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to={`/cookie-policy`} >Cookie Policy</NavLink>
                </li>
                <li>
                    <li>
                        <NavLink exact activeClassName="active" to={`/about`}>About vitalERP</NavLink>
                    </li>
                </li>
            </ul>
        </div>
    )
}

export default PolicyMenus;