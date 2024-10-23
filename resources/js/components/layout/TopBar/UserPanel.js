import React, { Component } from 'react';
import './TopBar.scss';
import { withRouter } from 'react-router-dom';
import { clearUser, clearToken, clearPWDRotation } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { AiOutlineLogout } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { Divider } from 'semantic-ui-react';
import axiosInstance from '../../../api/api';

class TobBar extends Component {

    state = {
        anchorEl: ''
    }

    logOut = () => {
        this.setState({ anchorEl: '' });
        axiosInstance.get('/api/auth/logout').then(e => {
            this.props.clearUser();
            this.props.clearPWDRotation();
            this.props.clearToken();
            deleteStore();
        }).catch(err => {
            this.props.clearUser();
            this.props.clearPWDRotation();
            this.props.clearToken();
            deleteStore();
        });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: '' });
    };

    navigateTo = event => {
        this.setState({ anchorEl: '' });
        this.props.history.push(event.target.id);
    }

    render() {

        const { anchorEl } = this.state;
        const { user } = this.props;

        return (
            <React.Fragment>

                <Button aria-controls="simple-menu" aria-haspopup="true" className="user__top_button" onClick={this.handleClick}>
                    <FaUserCircle className="user__icon" /> {user.first_name} <IoIosArrowDown className="user__drop_down" />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >

                    <div className="userInfo">
                        <h4>{user.first_name}</h4>
                        <p>{user.email}</p>
                    </div>

                    <Divider style={{ marginTop: '0px' }} />

                    <MenuItem id="/settings/user" onClick={this.navigateTo} >
                        <FaRegUserCircle /> &nbsp;&nbsp; User Settings
                        </MenuItem>

                    <Divider />

                    <MenuItem onClick={this.logOut}><AiOutlineLogout /> &nbsp;&nbsp; Logout</MenuItem>
                </Menu>

            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { clearUser, clearToken, clearPWDRotation })(TobBar));
