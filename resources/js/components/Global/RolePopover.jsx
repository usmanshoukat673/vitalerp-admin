import React, { useState } from 'react';
import { Chip, Stack, Popover, Typography, Button } from '@mui/material';

const RolePopover = ({ roles }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Chip
                size="small"
                variant="outlined"
                label={roles[0].role.name}
                color="primary"
            />
            {roles.length > 1 && (
                <>
                    <Button
                        aria-describedby={id}
                        variant="text"
                        size="small"
                        onClick={handleClick}
                    >
                        +{roles.length - 1} more
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Stack spacing={1} padding={2}>
                            {roles.slice(1).map((role, index) => (
                                <Typography key={index}>{role.role.name}</Typography>
                            ))}
                        </Stack>
                    </Popover>
                </>
            )}
        </>
    );
};

export default RolePopover;
