import React from 'react';
import { Message } from 'semantic-ui-react';
import AuthHeader from '../AuthHeader';
import { Box, Typography } from '@mui/material';


class SingupSuccess extends React.Component {

    state = {
        email: ''
    }

    componentDidMount() {
        const { email } = this.props.match.params;
        this.setState({ email });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { email } = this.state;

        return (

            <>
                <AuthHeader signup={true} />

                <Box sx={{ display: 'flex', marginTop: '30px' }} >
                    <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                    </Box>

                    <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">
                        <Typography variant="h4">Account Created successfully.</Typography>


                        <Message color="blue">
                            You're almost there! We have sent an email to <strong>{email}</strong> with login creditials, please check your inbox.
                        </Message>

                        <p>If you don't see it, you may need to <b>check your spam</b> folder</p>
                    </Box>
                </Box>
            </>

        );
    }
}

export default SingupSuccess;
