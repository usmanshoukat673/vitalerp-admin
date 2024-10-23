import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { toggleCreateRecord } from "../../actions";

const AddRecordButton = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleCreateRecord({
            open: true,
            type: 'add',
        }));
    }

    return (
        <Button onClick={handleClick} sx={{ textTransform: 'capitalize' }} variant="outlined" startIcon={<AddIcon />}>
            Add Record
        </Button>
    )
}

export default AddRecordButton;