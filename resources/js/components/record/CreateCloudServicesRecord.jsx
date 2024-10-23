import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { setCompanyLocations, setCompanyTeams, setCompanyUsers, toggleCreateRecord } from "../../actions";
import axiosInstance from "../../api/api";
import { MODULE_SUPPLIERS, MODULE_VENDORS } from "../../constants/layout";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import getFormatedDate from "../../utils/getFormatedDate";

const CreateCloudServicesRecord = ({ pushRecordInTree }) => {

    const dispatch = useDispatch();
    const [creating, setCreating] = useState(false);
    const [loading_records, setLoadingRecords] = useState('');
    const [records, setRecords] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [version, setVersion] = useState('');
    const [license_type, setLicenseType] = useState('');
    const [acquired_date, setAcquiredDate] = useState('');

    const [thirdparties, setThirdParties] = useState([]);
    const [add_vos, setAddVOS] = useState(false);
    const [vendor_or_supplier, setVendorOrSuppiler] = useState(MODULE_VENDORS);
    const [add_vos_name, setAddVOSName] = useState('');

    const [primary_user_team, setPrimaryUserTeam] = useState('');
    const [add_primary_user_team, setAddPrimaryUserTeam] = useState(false);
    const [primary_user_or_team, setPrimaryUserOrTeam] = useState('');
    const [primary_user_or_team_name, setPrimaryUserOrTeamName] = useState('');

    const [datasets, setDatasets] = useState([]);
    const [add_datasets, setAddDatasets] = useState(false);
    const [add_datasets_name, setAddDatasetsName] = useState('');

    const [infosysts, setInforSysts] = useState([]);
    const [add_infosysts, setAddInfosysts] = useState(false);
    const [add_infosysts_name, setAddInfosystsName] = useState('');

    const [hd_locations, setHDLocations] = useState([]);
    const [add_location, setAddLocation] = useState(false);
    const [add_location_name, setAddLocationName] = useState('');

    const { category, create_record, details_panel_type, parent_asset, sub_asset, lan_assets, users, teams, locations } = useSelector((state) => ({
        category: state.lanscape.category,
        create_record: state.lanscape.create_record,
        details_panel_type: state.lanscape.details_panel_type,
        parent_asset: state.lanscape.parent_asset,
        sub_asset: state.lanscape.sub_asset,
        lan_assets: state.lanscape.lan_assets,
        users: state.orgs.company_users,
        teams: state.orgs.teams,
        locations: state.locations.locations,
    }));

    useEffect(() => {
        if (create_record?.type == "configure") {
            setName(create_record?.record_to_configure?.name);
        }
    }, [create_record]);

    useEffect(() => {
        if (create_record?.type == "add") {
            setType(sub_asset.id);
        }
    }, [sub_asset]);

    useEffect(() => {
        loadRecords();
    }, [category]);

    const loadRecords = () => {
        setLoadingRecords(true);
        // Perform actions based on the URL parameters
        axiosInstance.get(`/api/user/records/index/all`)
            .then(e => {
                setRecords(e.data.records);
            })
            .catch(err => {
            }).finally(() => setLoadingRecords(false));
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleThirdPartyChange = (event) => {
        setThirdParties(event.target.value);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleLicenseChange = (event) => {
        setLicenseType(event.target.value);
    }

    const handleAcquiredDate = (value) => {
        setAcquiredDate(value);
    }

    const handleSubmit = () => {
        setCreating(true);

        axiosInstance.post(`/api/user/records/add`, {
            name,
            description,
            asset_id: type,
            module_id: category.id,
            parent: null,
            thirdparties,
            version,
            license_type,
            acquired_date: getFormatedDate(acquired_date),
            add_vos,
            vendor_or_supplier,
            add_vos_name,
            primary_user_team,
            add_primary_user_team,
            primary_user_or_team,
            primary_user_or_team_name,
            hd_locations,
            add_location,
            add_location_name,
            infosysts,
            add_infosysts,
            add_infosysts_name,
            datasets,
            add_datasets,
            add_datasets_name,
            action_type: create_record?.type,
            existing_record_id: create_record?.record_to_configure?.id
        })
            .then(e => {
                dispatch(setCompanyLocations(e.data.locations));
                setRecords([...records, e.data.record]);
                dispatch(setCompanyUsers(e.data.users));
                dispatch(setCompanyTeams(e.data.teams));
                pushRecordInTree(e.data.record, parseInt(type));
                handleClose();
            })
            .catch(err => {
            }).finally(() => setCreating(false));
    }

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(toggleCreateRecord({
                open: false,
            }));
        }, 50);
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '0px 15px' }}>

            <div style={{ display: 'flex', width: '100%' }}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <label htmlFor="name">Name</label>
                    <TextField
                        id="name"
                        size="small"
                        value={name}
                        onChange={handleNameChange}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <label htmlFor="type">What Type of Software Is This?</label>
                    <Select
                        id="type"
                        value={type}
                        onChange={handleTypeChange}
                        size="small"
                    >
                        {
                            _.map(lan_assets, parent_asset => {
                                return _.map(parent_asset.childs, sub_asset => (
                                    <MenuItem key={`sub_asset${sub_asset.id}`} value={sub_asset.id}>{sub_asset.name}</MenuItem>
                                ))
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <FormControl fullWidth sx={{ m: 1 }}>
                <label htmlFor="description">Describe the purpose of this software?</label>
                <TextField
                    id="description"
                    multiline
                    rows={2}
                    name="description"
                    size="small"
                    onChange={handleDescriptionChange}
                />
            </FormControl>

            <div style={{ display: 'flex', width: '100%' }}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <label htmlFor="version">What Is the Version of the Software?</label>
                    <TextField
                        id="version"
                        size="small"
                        onChange={(e) => setVersion(e.target.value)}
                        value={version}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <label htmlFor="license_type">What Is the License Type?</label>
                    <Select
                        id="license_type"
                        value={license_type}
                        onChange={handleLicenseChange}
                        size="small"
                    >
                        <MenuItem value={`Commercial`}>Commercial</MenuItem>
                        <MenuItem value={`Government`}>Government</MenuItem>
                        <MenuItem value={`Open Source`}>Open Source</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {
                !add_vos && <div className="create_record_input_group">
                    {/* ID = 1 Module id = 3*/}
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="thirdparty">Who Is the Software Vendor/Provider?</label>
                        <Select
                            id="thirdparty"
                            size="small"
                            multiple
                            value={thirdparties}
                            onChange={handleThirdPartyChange}
                            input={<OutlinedInput label="Thirdparty" />}
                            renderValue={(selected) => selected.map(id => records.find(rec => rec.id === id).name).join(', ')}
                        >
                            {
                                _.map(records, r => {
                                    return (r.module_id == 9 || r.module_id == 10) && (
                                        <MenuItem key={`thirdparty_${r.id}`} value={r.id}>
                                            <Checkbox checked={thirdparties.indexOf(r.id) > -1} />
                                            <ListItemText primary={r.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                        {
                            _.size(thirdparties) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to Add new Vendor or Supplier
                            </p> : <Link className="chand" underline="none" onClick={() => setAddVOS(true)}>
                                Click here to Add new Vendor or Supplier
                            </Link>
                        }

                    </FormControl>
                </div>
            }

            {
                add_vos && <div className="create_record_input_group">
                    {/* ID = 1 Module id = 3*/}
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="team">Is it Vendor or Supplier?</label>
                        <Select
                            id="vendor_or_supplier"
                            size="small"
                            value={vendor_or_supplier}
                            onChange={(e) => setVendorOrSuppiler(e.target.value)}
                        >
                            <MenuItem value={MODULE_VENDORS}>Vendor</MenuItem>
                            <MenuItem value={MODULE_SUPPLIERS}>Supplier</MenuItem>
                        </Select>

                        <Link className="chand" underline="none" onClick={() => setAddVOS(false)}>
                            Click here to select existing Vendor or Supplier
                        </Link>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                        <label>Name</label>
                        <TextField
                            id=""
                            size="small"
                            label={vendor_or_supplier == MODULE_VENDORS ? 'Add New Vendor' : 'Add New Supplier'}
                            name="add_vos_name"
                            value={add_vos_name}
                            onChange={(e) => setAddVOSName(e.target.value)}
                        />
                    </FormControl>
                </div>
            }

            <div style={{ display: 'flex', width: '100%' }}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <label htmlFor="version">What Is the Acquired Date?</label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={acquired_date}
                            renderInput={(params) => <TextField size="small" {...params} />}
                            onChange={handleAcquiredDate}
                        />
                    </LocalizationProvider>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>

                </FormControl>
            </div>

            {
                !add_primary_user_team && <div className="create_record_input_group">
                    {/* ID = 2 Module id = 3*/}

                    <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="primary_user_team">Which Departments or Users Will Be Utilizing This Software?</label>
                        <Select
                            native
                            value={primary_user_team}
                            id="primary_user_team"
                            size="small"
                            onChange={(e) => setPrimaryUserTeam(e.target.value)}
                        >
                            <option aria-label="None" value="" />
                            <optgroup label="Users">
                                {
                                    _.map(users, u => <option key={`user_${u.user_id}`} value={`user_${u.user_id}`}>{`${u.user.first_name} ${u.user.last_name}`}</option>)
                                }
                            </optgroup>
                            <optgroup label="Teams">
                                {
                                    _.map(teams, t => <option key={`team_${t.id}`} value={`team_${t.id}`}>{`${t.name}`}</option>)
                                }
                            </optgroup>
                        </Select>


                        {
                            !_.isEmpty(primary_user_team) ? <p style={{ color: '#ccc' }}>
                                Click here to add new User or Team
                            </p> : <Link className="chand" underline="none" onClick={() => setAddPrimaryUserTeam(true)}>
                                Click here to add new User or Team
                            </Link>
                        }
                    </FormControl>

                </div>
            }

            {
                add_primary_user_team && <div className="create_record_input_group">
                    {/* ID = 1 Module id = 3*/}
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="primary_user_or_team">Which Departments or Users Will Be Utilizing This Software?</label>
                        <Select
                            id="primary_user_or_team"
                            size="small"
                            value={primary_user_or_team}
                            onChange={(e) => setPrimaryUserOrTeam(e.target.value)}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="team">Team</MenuItem>
                        </Select>

                        <Link className="chand" underline="none" onClick={() => setAddPrimaryUserTeam(false)}>
                            Click here to select existing User or Team
                        </Link>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                        <label>Name</label>
                        <TextField
                            id=""
                            size="small"
                            label={primary_user_or_team == 'user' ? 'Add New User {FirstName} {LastName}' : 'Add New Team'}
                            name="primary_user_or_team_name"
                            value={primary_user_or_team_name}
                            onChange={(e) => setPrimaryUserOrTeamName(e.target.value)}
                        />
                    </FormControl>
                </div>
            }

            <div className="create_record_input_group">
                {
                    !add_datasets && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="data-set">What Data Types Will This Software Process or Store?</label>
                        <Select
                            id="data-set"
                            size="small"
                            multiple
                            value={datasets}
                            onChange={(e) => setDatasets(e.target.value)}
                            input={<OutlinedInput label="Dataset" />}
                            renderValue={(selected) => selected.map(id => records.find(rec => rec.id === id).name).join(', ')}
                        >
                            {
                                _.map(records, r => {
                                    return (r.module_id == 6) && (
                                        <MenuItem key={`datasets_${r.id}`} value={r.id}>
                                            <Checkbox checked={datasets.indexOf(r.id) > -1} />
                                            <ListItemText primary={r.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        {
                            _.size(datasets) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to add new Data Type
                            </p> : <Link className="chand" underline="none" onClick={() => setAddDatasets(true)}>
                                Click here to add new Data Type
                            </Link>
                        }
                    </FormControl>
                }

                {
                    add_datasets && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="data-set">What Data Types Will This Software Process or Store?</label>
                        <TextField
                            id=""
                            size="small"
                            label="Add New"
                            name="add_datasets_name"
                            value={add_datasets_name}
                            onChange={(e) => setAddDatasetsName(e.target.value)}
                        />
                        <Link className="chand" underline="none" onClick={() => setAddDatasets(false)}>
                            Click here to select existing Data Types
                        </Link>
                    </FormControl>
                }

            </div>

            <div className="create_record_input_group">
                {
                    !add_infosysts && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="infosysts">Is This Software Part of a Larger Information System?</label>
                        <Select
                            id="infosysts"
                            size="small"
                            multiple
                            value={infosysts}
                            onChange={(e) => setInforSysts(e.target.value)}
                            input={<OutlinedInput label="Dataset" />}
                            renderValue={(selected) => selected.map(id => records.find(rec => rec.id === id).name).join(', ')}
                        >
                            {
                                _.map(records, r => {
                                    return (r.module_id == 8) && (
                                        <MenuItem key={`infosysts_${r.id}`} value={r.id}>
                                            <Checkbox checked={infosysts.indexOf(r.id) > -1} />
                                            <ListItemText primary={r.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        {
                            _.size(infosysts) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to add new Information System
                            </p> : <Link className="chand" underline="none" onClick={() => setAddInfosysts(true)}>
                                Click here to add new Information System
                            </Link>
                        }
                    </FormControl>
                }
                {
                    add_infosysts && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="infosysts">Is This Software Part of a Larger Information System?</label>
                        <TextField
                            id=""
                            size="small"
                            label="Add New"
                            name="add_infosysts_name"
                            value={add_infosysts_name}
                            onChange={(e) => setAddInfosystsName(e.target.value)}
                        />
                        <Link className="chand" underline="none" onClick={() => setAddInfosysts(false)}>
                            Click here to select existing Information System
                        </Link>
                    </FormControl>
                }
            </div>

            <div className="create_record_input_group">
                {
                    !add_location && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="hd_locations">What Is the Installation Location?</label>
                        <Select
                            id="hd_locations"
                            size="small"
                            multiple
                            value={hd_locations}
                            onChange={(e) => setHDLocations(e.target.value)}
                            input={<OutlinedInput label="Location" />}
                            renderValue={(selected) => selected.map(id => locations.find(loc => loc.id === id).name).join(', ')}
                        >
                            {
                                _.map(locations, l => {
                                    return (<MenuItem key={`hd_locations_${l.id}`} value={l.id}>
                                        <Checkbox checked={hd_locations.indexOf(l.id) > -1} />
                                        <ListItemText primary={l.name} />
                                    </MenuItem>)
                                })
                            }
                        </Select>

                        {
                            _.size(hd_locations) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to add new Location
                            </p> : <Link className="chand" underline="none" onClick={() => setAddLocation(true)}>
                                Click here to add new Location
                            </Link>
                        }
                    </FormControl>
                }
                {
                    add_location && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="hd_locations">What Is the Installation Location?</label>
                        <TextField
                            id=""
                            size="small"
                            label="Add New"
                            name="add_location_name"
                            value={add_location_name}
                            onChange={(e) => setAddLocationName(e.target.value)}
                        />
                        <Link className="chand" underline="none" onClick={() => setAddLocation(false)}>
                            Click here to select existing Location
                        </Link>
                    </FormControl>
                }

            </div>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1 }}>
                <Button disabled={creating} variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button sx={{ marginLeft: '10px' }} variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
        </Box>
    )
}

export default CreateCloudServicesRecord;