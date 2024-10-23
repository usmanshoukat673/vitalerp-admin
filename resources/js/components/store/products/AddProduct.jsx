import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const AddProduct = ({ product, added }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelection = (plan) => {
        setOpen(false);
        added(plan);
    }

    return (
        <>
            {
                product.isSubscribed ? <Button variant="contained" color="success" startIcon={<CheckIcon />}>
                    Subscribed
                </Button> :
                    <>
                        <Button variant="outlined" onClick={handleOpen} startIcon={<AddShoppingCartIcon />}>
                            Subscribe
                        </Button>
                        <SimpleDialog
                            open={open}
                            onClose={handleClose}
                            product={product}
                            added={handleSelection}
                        />
                    </>
            }

        </>
    )
}

const SimpleDialog = ({ onClose, open, product, added }) => {

    const handlePlanSelection = (value) => {
        added(value);
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Subscription Plan:</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <ListItemButton onClick={() => handlePlanSelection('month')}>
                        <ListItemText primary={`US ${product.monthly_price.toFixed(2)}/Month`} />
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters>
                    <ListItemButton onClick={() => handlePlanSelection('year')}>
                        <ListItemText primary={`US ${product.yearly_price.toFixed(2)}/Year`} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}


export default AddProduct;