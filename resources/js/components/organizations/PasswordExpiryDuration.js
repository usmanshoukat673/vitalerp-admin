import React, { Component } from 'react';
import { Segment, Divider } from 'semantic-ui-react';
import { GlobalAppName } from '../..';

class PasswordExpiryDuration extends Component {

    state = {
        loading: false,
        errors: [],
    };

    render() {

        const { errors, loading } = this.state;

        return (
            <React.Fragment>
                <Segment piled style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                        <h3>Password Rotation</h3>
                    </div>
                    <Divider />

                    Password Rotation policy is set for 90 days. A Password should not be older then 90 days to access the {GlobalAppName} Platform
                </Segment>

            </React.Fragment>
        );
    }

}

export default PasswordExpiryDuration;
