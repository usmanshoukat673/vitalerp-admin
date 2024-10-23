import React, { Component } from 'react';
import { GlobalAppName } from '../../..';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <div className="app__footer">
                {/* Copyright &copy; {GlobalAppName}, LLC {(new Date().getFullYear())} */}
            </div>
        );
    }
}

export default Footer;
