import React from 'react';
import { AppOnboardingLogo, GlobalAppName,  } from '../..'; // AppAuthLogo

const IdentificationLogo = () => {
    return (
        <>
            <div className="auth_logo">
                <img src={AppOnboardingLogo} alt={GlobalAppName} />
            </div>
        </>
    )
}

export default IdentificationLogo;