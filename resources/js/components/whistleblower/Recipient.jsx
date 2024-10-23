import React, { useState } from "react";
import Chip from '@mui/material/Chip';
import axiosInstance from "../../api/api";

const Recipient = ({ recipent, removed }) => {

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        axiosInstance.delete(`/api/user/whistleblows/recipients/delete/${recipent.id}`)
        .then(e => {
            setLoading(false);
            removed(recipent);
        })
        .catch(err => {
            setLoading(false);
            if (err.response.status === 500) {
                setErrors([]);
            }
        });
    }

    return (
        <Chip label={`${recipent.name}`} disabled={loading} variant="outlined" onDelete={handleDelete} />
    );
}

export default Recipient;