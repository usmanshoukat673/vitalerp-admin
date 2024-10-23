import React, { Component } from 'react';
import _ from 'lodash';
import { Image as ImageComponent, Item, Dimmer, Loader, Segment, Button, List, Divider } from 'semantic-ui-react';

class Preferences extends Component {

    render() {

        return (
            <React.Fragment>

                <div className="row" style={{ margin: '15px 5px 55px 5px' }}>
                    <div className="col-md-12">
                        <Segment piled style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                                <h3>Preferences</h3>
                            </div>
                            <Divider />
                        </Segment>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


export default Preferences
