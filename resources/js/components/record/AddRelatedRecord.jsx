import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
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

const AddRelatedRecord = ({ module_id, question_id }) => {

    const dispatch = useDispatch();

    const [creating, setCreating] = useState(false);
    const [loading_records, setLoadingRecords] = useState('');
    const [records, setRecords] = useState([]);
    const [module, setModule] = useState({});


    const [selected_records, setSelectedRecords] = useState([]);
    const [add_record, setAddSoftware] = useState(false);
    const [add_record_name, setAddRecordName] = useState('');


    const { category, record_details, record } = useSelector((state) => ({
        category: state.lanscape.category,
        record_details: state.lanscape.record_details,
        record: state.lanscape.record,
    }));

    useEffect(() => {
        axiosInstance.get(`/api/user/records/module/${module_id}`)
            .then(e => {
                setModule(e.data);
            })
            .catch(err => {
            });
    }, [module_id]);

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

    const handleSubmit = () => {
        setCreating(true);
        axiosInstance.post(`/api/user/records/related/add`, {
            selected_records,
            add_record,
            add_record_name,
            module_id,
            parent: record.id,
            question_id
        })
            .then(e => {
                dispatch(saveRecordDetails({
                    ...record_details,
                    relatedrecords: e.data.relatedrecords,
                }));
                setSelectedRecords([]);
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
                    !add_record && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_record_name">Select {`${module.name}`}:</label>
                        <Select
                            id={`${module.slug}`}
                            size="small"
                            multiple
                            value={selected_records}
                            onChange={(e) => setSelectedRecords(e.target.value)}
                            input={<OutlinedInput label={`${module.name}`} />}
                            renderValue={(selected) => selected.map(id => records.find(rec => rec.id === id).name).join(', ')}
                        >
                            {
                                _.map(records, r => {
                                    return (r.module_id == module_id && !idExists(record_details.relatedrecords, 'related_record_id', r.id) && !idExists(record_details.relatedrecords, 'record_id', r.id)) && (
                                        <MenuItem key={`${module.slug}_${r.id}`} value={r.id}>
                                            <Checkbox checked={selected_records.indexOf(r.id) > -1} />
                                            <ListItemText primary={r.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        {
                            _.size(selected_records) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to add new {`${module.name}`}
                            </p> : <Link className="chand" underline="none" onClick={() => setAddSoftware(true)}>
                                Click here to add new {`${module.name}`}
                            </Link>
                        }
                    </FormControl>
                }
                {
                    add_record && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_record_name">{`${module.name}`} Name:</label>
                        <TextField
                            id=""
                            size="small"
                            label="Add New"
                            name="add_record_name"
                            value={add_record_name}
                            onChange={(e) => setAddRecordName(e.target.value)}
                        />
                        <Link className="chand" underline="none" onClick={() => setAddSoftware(false)}>
                            Click here to select existing {`${module.name}`}
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

export default AddRelatedRecord;