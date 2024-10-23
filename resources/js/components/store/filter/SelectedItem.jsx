import React from "react";
import Chip from '@mui/material/Chip';

const SelectedItem = ({ item, handleDelete, type }) => {
    return (
        <span>
            {
                item.checked ?
                    <Chip sx={{
                        marginRight: '5px', marginBottom: '5px'
                    }} label={`${item.name}`} color="primary" variant="outlined" onDelete={() => handleDelete({ ...item, checked: false, type: type })} />
                    :
                    ''
            }
        </span>
    )
}

export default SelectedItem;