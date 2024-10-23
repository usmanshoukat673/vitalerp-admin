import React from 'react';
import { NavLink } from 'react-router-dom';

const BuildFooter = () => {

    return (
        <div className='ai_build_footer'>
            <div className='ai___section'>
                <div className='left_section'>
                    <img className="footerLogo" src="/images/logo/logo.png" />

                    <a className='app_name'>vitalERP</a>

                    <sub>SUPPLIER</sub>
                </div>

                <div className='right_section'>
                    <NavLink to={`/about`} className='footer_link'>About vitalERP</NavLink>

                    <NavLink to={`/privacy-policy`} className='footer_link'>Privacy</NavLink>

                    <NavLink to={`/terms`} className='footer_link'>Terms</NavLink>
                </div>
            </div>
        </div>
    )
}

export default BuildFooter; 