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
import { saveRecordDetails, setRelatedRecord } from "../../actions";
import axiosInstance from "../../api/api";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

function idExists(array, targetProperty, targetId) {
    // Use Array.some() method to check if any object in the array has the targetId
    return array.some(item => item[targetProperty] === targetId);
  }

const AddLocation = ({ question_id }) => {

    const dispatch = useDispatch();

    const [creating, setCreating] = useState(false);

    const [selected_locations, setSelectedLocations] = useState([]);
    const [add_location, setAddLocation] = useState(false);
    const [add_location_name, setAddRecordName] = useState('');


    const { record_details, record, locations } = useSelector((state) => ({
        record_details: state.lanscape.record_details,
        record: state.lanscape.record,
        locations: state.locations.locations,
    }));

    const handleSubmit = () => {
        setCreating(true);
        axiosInstance.post(`/api/user/records/location/add`, {
            selected_locations,
            add_location,
            add_location_name,
            module_id: record.module_id,
            parent: record.id,
            question_id
        })
            .then(e => {
                dispatch(saveRecordDetails({
                    ...record_details,
                    locations: e.data.locations,
                }));
                setSelectedLocations([]);
                handleClose();
            })
            .catch(err => {
            }).finally(() => setCreating(false));
    }

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(setRelatedRecord({
                open: false,
            }));
        }, 50);
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="create_record_input_group">
                {
                    !add_location && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_location_name">Select Location:</label>
                        <Select
                            id={`location`}
                            size="small"
                            multiple
                            value={selected_locations}
                            onChange={(e) => setSelectedLocations(e.target.value)}
                            input={<OutlinedInput label="Location" />}
                            renderValue={(selected) => selected.map(id => locations.find(loc => loc.id === id).name).join(', ')}
                        >
                            {
                                _.map(locations, lct => {
                                    return (!idExists(record_details.locations, 'location_id', lct.id)) && (
                                        <MenuItem key={`location_${lct.id}`} value={lct.id}>
                                            <Checkbox checked={selected_locations.indexOf(lct.id) > -1} />
                                            <ListItemText primary={lct.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        {
                            _.size(selected_locations) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to add new Location
                            </p> : <Link className="chand" underline="none" onClick={() => setAddLocation(true)}>
                                Click here to add new Location
                            </Link>
                        }
                    </FormControl>
                }
                {
                    add_location && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_location_name">Location Name:</label>
                        <TextField
                            id=""
                            size="small"
                            label="Add New"
                            name="add_location_name"
                            value={add_location_name}
                            onChange={(e) => setAddRecordName(e.target.value)}
                        />
                        <Link className="chand" underline="none" onClick={() => setAddLocation(false)}>
                            Click here to select existing location
                        </Link>
                    </FormControl>
                }
            </div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1 }}>
                <Button disabled={creating} onClick={handleSubmit} variant="contained">Submit</Button>
                <Button sx={{ marginLeft: '10px' }} variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
        </Box>
    )
}

export default AddLocation;