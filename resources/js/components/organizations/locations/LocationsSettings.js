import React, { Component } from 'react';
import _ from 'lodash';
import { Pagination, Button, List, Divider, Form, Dropdown } from 'semantic-ui-react';
import { setCompany, setCompanies, setCompanyLocations } from '../../../actions';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withRouter } from 'react-router';
import './LocationsSettings.scss';
import axiosInstance from '../../../api/api';
import VisitDashboardBreadcrum from '../../dashboard/VisitDashboardBreadcrum';
import AddLocationDialog from './AddLocationDialog';
import { NotificationManager } from 'react-notifications';
import { Link } from '@mui/material';
import EditLocationDialog from './EditLocationDialog';


class LocationsSettings extends Component {

    state = {
        loading: false,
        add_location: false,
        errors: [],
        locations: [],
        activePage: 1,
        totalPages: 0,
        tz_list: [],
        location_to_edit: {},
        edit_location: false,
    };

    componentDidMount() {
        this.loadLocations(1);
        this.setState({ tz_list: moment.tz.names() });
    }

    handlePaginationChange = (e, { activePage }) => this.loadLocations(activePage);

    loadLocations = activePage => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/locations/list/${company.id}?page=${activePage}`).then(e => {
            this.setState({
                loading: false,
                locations: e.data.locations.data,
                activePage: e.data.locations.current_page,
                totalPages: e.data.locations.last_page
            });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    }

    closeAddLocationModal = () => {
        this.setState({ add_location: false })
    }

    locationAdded = location => {
        // reload current page
        this.loadLocations(this.state.activePage);
        let locations = this.props.locations;
        locations.push(location);
        this.props.setCompanyLocations(locations);
        this.setState({ add_location: false });
    }

    locationEdited = location => {
        var locations = this.state.locations;
        var index = _.findIndex(locations, loc => {
            return loc.id === location.id;
        });
        locations[index] = location;
        this.setState({ locations });


        var locations = this.props.locations;
        var index = _.findIndex(locations, loc => {
            return loc.id === location.id;
        });
        locations[index] = location;
        this.props.setCompanyLocations(locations);
        this.setState({ location_to_edit: {}, edit_location: false });
    }

    editLocation = location => {
        this.setState({ location_to_edit: location, edit_location: true });
    }

    closeEditLocationModal = () => {
        this.setState({ location_to_edit: {}, edit_location: false });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { locations, add_location, tz_list, location_to_edit, edit_location, activePage, totalPages, states } = this.state;

        const { company, token, leftnav } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>

                <div className="locations__mainbd">
                    <div className="locations__breadcrum"><VisitDashboardBreadcrum /> {' > '} Secondary Locations</div>

                    <div className="locations__header">
                        <div className="__name">Secondary Locations</div>
                        <div className="__actions">
                            <Button onClick={() => { this.setState({ add_location: true }) }} basic color="black">Add New Location</Button>
                        </div>
                    </div>
                </div>

                <div className="locations__container">

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Name</TableCell>
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">City</TableCell>
                                    <TableCell align="center">State</TableCell>
                                    <TableCell align="center">Country</TableCell>
                                    <TableCell align="center">TimeZone</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {locations.map((location) => (
                                    <TableRow key={location.name}>
                                        <TableCell component="th" scope="row" align="left">
                                            <Link underline='none' sx={{ cursor: 'pointer' }} onClick={() => { this.editLocation(location) }}>
                                                {location.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">{location.address}</TableCell>
                                        <TableCell align="center">{location.city}</TableCell>
                                        <TableCell align="center">{location.state}</TableCell>
                                        <TableCell align="center">{location.country}</TableCell>
                                        <TableCell align="center">{location.timezone}</TableCell>
                                        <TableCell align="right"></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className="pagination__container">
                        <Pagination
                            activePage={activePage}
                            onPageChange={this.handlePaginationChange}
                            totalPages={totalPages} />
                    </div>
                </div>

                {add_location ? <AddLocationDialog
                    added={this.locationAdded}
                    open={add_location}
                    tz_list={tz_list}
                    close={this.closeAddLocationModal}
                /> : ''}
                {edit_location ? <EditLocationDialog
                    edited={this.locationEdited}
                    open={edit_location}
                    location={location_to_edit}
                    tz_list={tz_list}
                    close={this.closeEditLocationModal} />
                    : ''}

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    locations: state.locations.locations,
    leftnav: state.leftnav,
    states: state.validvalues.states,
    countries: state.validvalues.countries
});

export default withRouter(connect(mapStateToProps, { setCompany, setCompanies, setCompanyLocations })(LocationsSettings));
