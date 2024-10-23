import { ClickAwayListener, Grow, Menu, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Bar } from "@column-resizer/react";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSubjectId, setFieldTypeToAdd, showRightSidebar, setProjectRightView } from '../../actions';

const AddColumn = ({ subject, onBarClick, barStyle, barSize }) => {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const dispatch = useDispatch();

    const { field_types } = useSelector(state => ({
        field_types: state.projects.field_types
    }));

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleAddColumn = (field_type) => {
        dispatch(showRightSidebar());
        dispatch(setProjectRightView('add_column'));
        dispatch(setFieldTypeToAdd(field_type));
        dispatch(setActiveSubjectId(subject.id));
        setOpen(false);
    }

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
            <Bar size={barSize} style={barStyle} onClick={onBarClick} />
            <div className='sb__column'>
                <div className='sb__column_heading'
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                ><AddIcon /></div>
            </div>

            <Popper
                sx={{minWidth: '170px'}}
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
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {
                                        _.map(field_types, (field_type) => (
                                            <MenuItem onClick={() => {handleAddColumn(field_type)}} key={field_type.id}>{field_type.name}</MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default AddColumn;