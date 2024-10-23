import React, { Component } from 'react';
import './Home.scss';
import { Grid } from 'semantic-ui-react';
import Logo from '../auth/logo';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Logo />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Home;
