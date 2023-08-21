import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Menu, MenuItem, Select, Slider, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AccordionComp = ({ children, title }) => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{ px: 1 }}>
                <div className="text-lg">{title} <KeyboardArrowDownIcon /></div>
            </AccordionSummary>
            <AccordionDetails>
                {children}

            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionComp