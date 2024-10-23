import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function FilterType({ title, items, type, selected }) {
    const [expanded, setExpanded] = useState(true);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    const handleSelected = (item) => {
        selected({ ...item, type: type })
    }

    return (
        <div className='__FilterType'>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{margin: '0px'}}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0, margin: '0px' }} >
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {
                            _.map(items, item => {
                                return (<FilterItem key={item.id} item={item} selected={handleSelected} />)
                            })
                        }
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

const FilterItem = ({ item, selected }) => {

    const handleChange = (event) => {
        selected({ ...item, checked: event.target.checked });
    };

    return (
        <FormControlLabel
            sx={{height: '22px'}}
            onChange={handleChange}
            key={item.id}
            control={<Checkbox checked={item.checked} />}
            label={item.name}
        />
    )
}