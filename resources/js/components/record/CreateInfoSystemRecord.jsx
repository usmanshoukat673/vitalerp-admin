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
import { toggleCreateRecord } from "../../actions";
import axiosInstance from "../../api/api";

const CreateInfoSystemRecord = ({ pushRecordInTree }) => {

    const dispatch = useDispatch();
    const [creating, setCreating] = useState(false);
    const [loading_records, setLoadingRecords] = useState('');
    const [records, setRecords] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const { category, create_record, details_panel_type, parent_asset, sub_asset, lan_assets } = useSelector((state) => ({
        category: state.lanscape.category,
        create_record: state.lanscape.create_record,
        details_panel_type: state.lanscape.details_panel_type,
        parent_asset: state.lanscape.parent_asset,
        sub_asset: state.lanscape.sub_asset,
        lan_assets: state.lanscape.lan_assets,
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

    const handleSubmit = () => {
        setCreating(true);

        axiosInstance.post(`/api/user/records/add`, {
            name,
            description,
            asset_id: type,
            module_id: category.id,
            parent: null,
            action_type: create_record?.type,
            existing_record_id: create_record?.record_to_configure?.id
        })
            .then(e => {
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

                </FormControl>
            </div>

            <FormControl fullWidth sx={{ m: 1 }}>
                <label htmlFor="description">Describe the Information System?</label>
                <TextField
                    id="description"
                    multiline
                    rows={2}
                    name="description"
                    size="small"
                    onChange={handleDescriptionChange}
                />
            </FormControl>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1 }}>
                <Button disabled={creating} variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button sx={{ marginLeft: '10px' }} variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
        </Box>
    )
}

export default CreateInfoSystemRecord;