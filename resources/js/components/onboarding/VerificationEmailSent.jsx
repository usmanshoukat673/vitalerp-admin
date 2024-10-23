import { Box, Typography } from '@mui/material';
import React from 'react';

const VerificationEmailSent = () => {
    return (
        <>
            <div className="auth_page_content">
                <Box sx={{ display: 'flex', marginTop: '80px', justifyContent: 'center' }}>
                    <Box sx={{ background: 'rgb(249 249 249);', padding: '20px', margin: '0px 200px', borderRadius: '6px', fontSize: '19px' }}>
                        <Typography sx={{marginBottom: '50px'}} variant="h4">Verification email has been sent</Typography>

                        <p>Thank you for signing up for our AI-powered compliance management platform. We're excited to have you on board and can't wait for you to experience the power of AI in compliance management.</p>
                        
                        <p>We've just sent a confirmation email to the address you provided. Please check your inbox (<a href='#'><u>and spam folder, just in case</u></a>) and click the verification link to complete your registration. Once you do, you'll be able to start using our platform and managing your compliance efficiently.</p>
                        
                        <p>With our platform, you'll be able to automate your compliance workflows, identify and remediate issues quickly, and get real-time insights into your compliance posture. We're confident that you'll find our platform to be a game-changer in the world of compliance management.</p>
                        
                        <p>If you have any questions or concerns, our team is always here to help. Just reach out to us, and we'll assist you.</p>
                    </Box>
                </Box>
            </div>
        </>
    );
}

export default VerificationEmailSent;