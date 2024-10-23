import React from 'react';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from 'react-redux';
import { hideRightSidebar, setActiveSubjectId, showRightSidebar, setColumnToEdit, setProjectRightView } from '../../actions';

const ColumnOptions = ({ column, subject }) => {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const dispatch = useDispatch();

    const handleEditColumn = () => {
        dispatch(showRightSidebar());
        dispatch(setProjectRightView('edit_column'));
        dispatch(setActiveSubjectId(subject.id));
        dispatch(setColumnToEdit({
            id: column.id,
            name: column.name,
            description: column.description,
            subject_id: column.subject_id
        }));
        setOpen(false);
    }

    const handleDeleteColumn = () => {
        dispatch(showRightSidebar());
        dispatch(setProjectRightView('delete_column'));
        dispatch(setActiveSubjectId(subject.id));
        dispatch(setColumnToEdit({
            id: column.id,
            name: column.name,
            description: column.description,
            subject_id: column.subject_id
        }));
        setOpen(false);
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };


    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    return (
        <>
            <div className='sb__column_heading'
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >{column.name} <KeyboardArrowDownIcon /> </div>

            <Popper
                sx={{ minWidth: '170px', zIndex: 10 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleEditColumn}>Edit Column</MenuItem>
                                    <MenuItem onClick={handleDeleteColumn}>Remove Column</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default ColumnOptions;