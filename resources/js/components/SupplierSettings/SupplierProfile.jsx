import React, { Component, useEffect } from 'react';
import _ from 'lodash';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import { setSupplier } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import moment from 'moment-timezone';
import axiosInstance from '../../api/api';
import { getError, isFieldExistsInErrors } from '../../utils/errorHelper';
import { Box, MenuItem, Select, TextField } from '@mui/material';

const SupplierProfile = ({ states, locations, countries }) => {

    const { company, supplier } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        leftnav: state.leftnav,
    }));

    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [tz_list, setTzList] = React.useState([]);

    const [formData, setFormData] = React.useState({
        name: (supplier.name != null ? supplier.name : ''),
        email: (supplier.email != null ? supplier.email : ''),
        address: (supplier.address != null ? supplier.address : ''),
        city: (supplier.city != null ? supplier.city : ''),
        state: (supplier.state != null ? supplier.state : ''),
        country: (supplier.country != null ? supplier.country : ''),
        postal_code: (supplier.postal_code != null ? supplier.postal_code : ''),
        timezone: (supplier.timezone != null ? supplier.timezone : moment.tz.guess()),
        website: (supplier.website != null ? supplier.website : ''),
        description: (supplier.description != null ? supplier.description : ''),
        phone: (supplier.phone != null ? supplier.phone : ''),
        default_location: '',
    });

    useEffect(() => {
        defaultLocation();
    }, []);

    useEffect(() => {
        setTzList(moment.tz.names());

        setFormData({
            ...formData,
            name: (supplier.name != null ? supplier.name : ''),
            email: (supplier.email != null ? supplier.email : ''),
            address: (supplier.address != null ? supplier.address : ''),
            city: (supplier.city != null ? supplier.city : ''),
            state: (supplier.state != null ? supplier.state : ''),
            country: (supplier.country != null ? supplier.country : ''),
            postal_code: (supplier.postal_code != null ? supplier.postal_code : ''),
            timezone: (supplier.timezone != null ? supplier.timezone : moment.tz.guess()),
            website: (supplier.website != null ? supplier.website : ''),
            description: (supplier.description != null ? supplier.description : ''),
            description: (supplier.phone != null ? supplier.phone : ''),
        });
    }, [supplier]);

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

    const defaultLocation = () => {
        axiosInstance.get(`/api/user/suppliers/${supplier.id}/default-location`)
            .then(response => {
                setFormData((prevState) => ({
                    ...prevState,
                    default_location: _.isEmpty(response.data) ? '' : response.data.id
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

        axiosInstance.put(`/api/user/suppliers/${supplier.id}`, {
            ...formData,
        })
            .then(response => {

                setFormData({
                    ...formData,
                    default_location: response.data.default_location.id
                });

                let comp = { ...supplier };
                comp.name = response.data.supplier.name;
                comp.email = response.data.supplier.email;
                comp.address = response.data.supplier.address;
                comp.city = response.data.supplier.city;
                comp.state = response.data.supplier.state;
                comp.country = response.data.supplier.country;
                comp.postal_code = response.data.supplier.postal_code;
                comp.timezone = response.data.supplier.timezone;
                comp.website = response.data.supplier.website;
                comp.description = response.data.supplier.description;
                comp.phone = response.data.supplier.phone;
                dispatch(setSupplier(comp));

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
                <div className="at__bucket__header">{supplier.name}</div>
                <div className="at__bucket__body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group widths='equal'>

                            <Form.Field>
                                <label>Corporate Email <span style={{ color: 'red' }}>*</span></label>
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

                            <Form.Field>
                                <label>Address <span style={{ color: 'red' }}>*</span></label>
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

                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>City <span style={{ color: 'red' }}>*</span></label>
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
                                <label>State/Province/Region <span style={{ color: 'red' }}>*</span></label>
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
                                <label>Country <span style={{ color: 'red' }}>*</span></label>
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
                                <label>Corporate Phone <span style={{ color: 'red' }}>*</span></label>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="phone"
                                    name='phone'
                                    type="number"
                                    value={formData.phone}
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('phone', errors)}
                                />
                                {isFieldExistsInErrors('phone', errors) && (
                                    <p style={{ color: 'red' }}>{getError('phone', errors)}</p>
                                )}
                            </Form.Field>

                            <Form.Field>
                                <label>ZIP / Postal Code <span style={{ color: 'red' }}>*</span></label>
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

export default SupplierProfile;