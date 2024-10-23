import React, { Component, useEffect } from 'react';
import _ from 'lodash';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import { setCompany, setCompanies, setCompanyLocations } from '../../actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import moment from 'moment-timezone';
import countryList from 'react-select-country-list';
import { withRouter } from 'react-router';
import axiosInstance from '../../api/api';
import { getError, isFieldExistsInErrors } from '../../utils/errorHelper';
import { Box, MenuItem, Select, TextField } from '@mui/material';

const CompanyProfile = ({ states, countries }) => {

    const { company, locations } = useSelector((state) => ({
        company: state.orgs.company,
        locations: state.locations.locations,
        leftnav: state.leftnav,
    }));

    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [tz_list, setTzList] = React.useState([]);

    const [formData, setFormData] = React.useState({
        name: (company.name != null ? company.name : ''),
        email: (company.email != null ? company.email : ''),
        address: (company.address != null ? company.address : ''),
        city: (company.city != null ? company.city : ''),
        state: (company.state != null ? company.state : ''),
        country: (company.country != null ? company.country : ''),
        postal_code: (company.postal_code != null ? company.postal_code : ''),
        timezone: (company.timezone != null ? company.timezone : moment.tz.guess()),
        website: (company.website != null ? company.website : ''),
        description: (company.description != null ? company.description : ''),
        default_location: '',
    });

    useEffect(() => {
        loadTzList();
    }, []);

    useEffect(() => {
        setTzList(moment.tz.names());

        setFormData({
            ...formData,
            name: (company.name != null ? company.name : ''),
            email: (company.email != null ? company.email : ''),
            address: (company.address != null ? company.address : ''),
            city: (company.city != null ? company.city : ''),
            state: (company.state != null ? company.state : ''),
            country: (company.country != null ? company.country : ''),
            postal_code: (company.postal_code != null ? company.postal_code : ''),
            timezone: (company.timezone != null ? company.timezone : moment.tz.guess()),
            website: (company.website != null ? company.website : ''),
            description: (company.description != null ? company.description : ''),
        });
    }, [company]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    }

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const loadTzList = () => {
        axiosInstance.get(`/api/user/org/tz-list/${company.id}/?usertz=${moment.tz.guess()}`)
            .then(response => {
                setFormData((prevState) => ({
                    ...prevState,
                    default_location: response.data?.default_location?.id
                }));
            })
            .catch(err => {
            });
    }

    const handleLocationsChange = (event, { value }) => {
        setFormData((prevState) => ({
            ...prevState,
            default_location: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosInstance.post('/api/user/org/save-basic-details', {
            ...formData,
            comp_id: company.id
        })
            .then(response => {

                // this.props.setCompanies(response.data.companies);
                // if (active_company.id === company.id) {
                //     this.props.setCompany(response.data.company);
                // }
                // this.props.history.push(`/${response.data.company.slug}/organization-settings/general`);
                // response.data.company

                setFormData({
                    ...formData,
                    default_location: response.data.default_location.id
                });

                let comp = { ...company };
                comp.name = response.data.company.name;
                comp.email = response.data.company.email;
                comp.address = response.data.company.address;
                comp.city = response.data.company.city;
                comp.state = response.data.company.state;
                comp.country = response.data.company.country;
                comp.postal_code = response.data.company.postal_code;
                comp.timezone = response.data.company.timezone;
                comp.website = response.data.company.website;
                comp.description = response.data.company.description;
                dispatch(setCompany(comp));
                setErrors({});
                NotificationManager.success('Details saved successfully!', 'Success');
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <div className="gnsettings__bucket">
                <div className="at__bucket__header">{company.name}</div>
                <div className="at__bucket__body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Organization Name <span style={{ color: 'red' }}>*</span></label>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="name"
                                    name='name'
                                    value={formData.name}
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('name', errors)}
                                />
                                {isFieldExistsInErrors('name', errors) && (
                                    <p style={{ color: 'red' }}>{getError('name', errors)}</p>
                                )}
                            </Form.Field>
                            <Form.Field>
                                <label>Email <span style={{ color: 'red' }}>*</span></label>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="email"
                                    name='email'
                                    value={formData.email}
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('email', errors)}
                                />
                                {isFieldExistsInErrors('email', errors) && (
                                    <p style={{ color: 'red' }}>{getError('email', errors)}</p>
                                )}
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Address</label>
                            <TextField
                                size="small"
                                fullWidth
                                id="address"
                                name='address'
                                value={formData.address}
                                variant="outlined"
                                onChange={handleChange}
                                error={isFieldExistsInErrors('address', errors)}
                            />
                            {isFieldExistsInErrors('address', errors) && (
                                <p style={{ color: 'red' }}>{getError('address', errors)}</p>
                            )}
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>City</label>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="city"
                                    name='city'
                                    value={formData.city}
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('city', errors)}
                                />
                                {isFieldExistsInErrors('city', errors) && (
                                    <p style={{ color: 'red' }}>{getError('city', errors)}</p>
                                )}
                            </Form.Field>
                            <Form.Field>
                                <label>State/Province/Region:</label>
                                <Select
                                    size='small'
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('state', errors)}
                                    fullWidth
                                    MenuProps={{ style: { display: 'block' } }}
                                >
                                    {_.map(states, state => (
                                        <MenuItem key={`state_${state.id}`} value={state.name}>{`${state.name}`}</MenuItem>
                                    ))}
                                </Select>

                                {isFieldExistsInErrors('state', errors) && (
                                    <p style={{ color: 'red' }}>{getError('state', errors)}</p>
                                )}
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Country</label>
                                <Select
                                    size='small'
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('country', errors)}
                                    fullWidth
                                    MenuProps={{ style: { display: 'block' } }}
                                >
                                    {_.map(countries, country => (
                                        <MenuItem key={`country_${country.id}`} value={country.name}>{`${country.name}`}</MenuItem>
                                    ))}
                                </Select>

                                {isFieldExistsInErrors('country', errors) && (
                                    <p style={{ color: 'red' }}>{getError('country', errors)}</p>
                                )}
                            </Form.Field>

                            <Form.Field>
                                <label>ZIP / Postal Code</label>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="postal_code"
                                    name='postal_code'
                                    value={formData.postal_code}
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('postal_code', errors)}
                                />
                                {isFieldExistsInErrors('postal_code', errors) && (
                                    <p style={{ color: 'red' }}>{getError('postal_code', errors)}</p>
                                )}
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Time Zone</label>
                                <Select
                                    size='small'
                                    id="timezone"
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('timezone', errors)}
                                    fullWidth
                                    MenuProps={{ style: { display: 'block' } }}
                                >
                                    {_.map(tz_list, tz => (
                                        <MenuItem key={`tz_${tz}`} value={tz}>{`${tz}`}</MenuItem>
                                    ))}
                                </Select>

                                {isFieldExistsInErrors('timezone', errors) && (
                                    <p style={{ color: 'red' }}>{getError('timezone', errors)}</p>
                                )}
                            </Form.Field>

                            <Form.Field>
                                <label>Location/NickName</label>
                                <Select
                                    size='small'
                                    id="default_location"
                                    name="default_location"
                                    value={formData.default_location}
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('default_location', errors)}
                                    fullWidth
                                    MenuProps={{ style: { display: 'block' } }}
                                >
                                    {_.map(locations, location => (
                                        <MenuItem key={`location_${location.id}`} value={location.id}>{`${location.name}`}</MenuItem>
                                    ))}
                                </Select>

                                {isFieldExistsInErrors('default_location', errors) && (
                                    <p style={{ color: 'red' }}>{getError('default_location', errors)}</p>
                                )}
                            </Form.Field>
                            <Form.Field>
                                <label>Website</label>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="website"
                                    name='website'
                                    value={formData.website}
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('website', errors)}
                                />
                                {isFieldExistsInErrors('website', errors) && (
                                    <p style={{ color: 'red' }}>{getError('website', errors)}</p>
                                )}
                            </Form.Field>
                        </Form.Group>
                        <Box sx={{ mb: 3 }}>
                            <label>Description</label>
                            <TextField
                                size="small"
                                fullWidth
                                multiline
                                id="description"
                                name='description'
                                value={formData.description}
                                variant="outlined"
                                onChange={handleChange}
                                error={isFieldExistsInErrors('description', errors)}
                            />
                            {isFieldExistsInErrors('description', errors) && (
                                <p style={{ color: 'red' }}>{getError('description', errors)}</p>
                            )}
                        </Box>
                        <Button disabled={loading} className={loading ? 'loading' : ''} type="submit" primary>Save</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default CompanyProfile;