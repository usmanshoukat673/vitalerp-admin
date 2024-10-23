import React from 'react';
import IdentificationLogo from '../auth/IdentificationLogo';

const NotFound = () => {
    return (
        <div className="auth auth_container">

            <div className="auth_page">
                <div className="auth_page_content">
                    <IdentificationLogo />

                    <div className="mt-5 content">
                        <h1>404 NOT FOUND</h1>
                        <p>The page your looking does not exits..!</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NotFound;
