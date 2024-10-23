import React, { Component } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { withRouter } from 'react-router-dom';
import { Checkbox } from 'semantic-ui-react';
import './SettingsShortcut.scss';
import IconButton from '@mui/material/IconButton';
import { VscChromeClose } from "react-icons/vsc";
import { connect } from 'react-redux';
import { setCompany, setCompanies } from '../../../actions';
import axiosInstance from '../../../api/api';

class SettingsShortcut extends Component {

    state = {
        required_mfa: false,
        loading: false,
        errors: []
    };

    componentDidMount() {
        const { company } = this.props;
        this.setState({ required_mfa: company.required_mfa });
    }

    toggleMFA = () => {
        this.setState((prevState) => {
            // Save seettings and update company
            return ({ required_mfa: !prevState.required_mfa });
        }, () => {
            this.setState({ errors: [], loading: true });
            const { required_mfa } = this.state;

            axiosInstance.post('/api/user/org/security/toggle-mfa', { required_mfa: required_mfa })
                .then(response => {
                    this.setState({
                        errors: [],
                        loading: false
                    });
                    this.props.setCompany(response.data.company);
                    this.props.setCompanies(response.data.companies);
                })
                .catch(err => {
                    if (err.response.status === 500) {
                        this.setState({ errors: [], loading: false });
                    }
                    if (err.response.status === 422) {
                        const errors = err.response.data.errors;

                        this.setState({ errors: this.state.errors.concat(errors), loading: false });
                    }
                    if (err.response.status === 400) {
                        this.setState({ errors: this.state.errors.concat(errors), loading: false });
                    }
                });

        });
    }

    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.props.onDrawerClose(open);
    };

    handleAllSettingsClick = () => {
        const { company } = this.props;
        this.props.onDrawerClose(false);
        this.props.history.push(`/${company.slug}/settings/basic`);
    }

    handlerSettingsClose = () => {
        this.props.onDrawerClose(false);
    }

    render() {
        const { required_mfa } = this.state;
        const { open } = this.props;

        return (
            <React.Fragment>
                <Drawer anchor="right" open={open} onClose={this.toggleDrawer(false)}>

                    <div
                        className="the_menu"
                        style={{ width: '250px' }}
                        role="presentation"
                    >

                        <div className="setting__sht__header">
                            <h3>Quick Settings</h3>

                            <IconButton className="close__button" onClick={this.handlerSettingsClose}><VscChromeClose /></IconButton>
                        </div>

                        <List>
                            <ListItem button onClick={this.handleAllSettingsClick}>
                                <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="All Settings" />
                            </ListItem>
                        </List>

                        <Divider />

                        <div className="mfa__container">

                            <h4>Multi Factor Authentication</h4>

                        </div>

                        <List>
                            <ListItem>
                                <Checkbox onChange={this.toggleMFA} checked={required_mfa} toggle label="Required Multi Factor Authentication" />
                            </ListItem>
                        </List>

                        <Divider />
                        {
                            /*
                              <List>
                             {['Temp 1', 'Temp 2', 'Temp 3', 'Drafts'].map((text, index) => (
                                 <ListItem button key={text}>
                                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                     <ListItemText primary={text} />
                                 </ListItem>
                             ))}
                         </List>
                         <Divider />
                             */
                        }

                    </div>

                </Drawer>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});

export default withRouter(connect(mapStateToProps, { setCompany, setCompanies })(SettingsShortcut));
