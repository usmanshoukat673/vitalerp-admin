import React, { Component } from 'react';
import { Segment, Checkbox, Divider } from 'semantic-ui-react';

class FreshdeskTicketing extends Component {
    state = {
        enable: false
    }

    toggle = () => { }


    render() {

        const { enable } = this.state;

        return (

            <React.Fragment>

                <Segment piled style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                        <h3>Freshdesk</h3>
                    </div>
                    <Divider />

                    <Checkbox onChange={this.toggle} checked={enable} toggle label="Use Freshdesk as your default ticketing system to issue ticket." />
                </Segment>

            </React.Fragment>
        );
    }
}

export default FreshdeskTicketing;
