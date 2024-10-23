import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StandardInformation = () => {

    const { active_standard } = useSelector((state) => ({
        active_standard: state.policyportal.active_standard
    }));

    return (
        <Row className="mx-n1 g-0">
            <Col>
                <Card className="m-1 shadow-none border p-2">
                    <Row>
                        <Col>
                            <Typography variant="overline" display="block" gutterBottom>
                                Type:
                            </Typography>
                            <Chip label={`${active_standard.type}`} color="primary" variant="outlined" />
                        </Col>
                        <Col>
                            <Typography variant="overline" display="block" gutterBottom>
                                Family:
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {
                                    _.size(active_standard.families) > 0 && <Stack direction="row" spacing={1}>
                                        {
                                            _.map(active_standard.families, family => (
                                                <Chip key={`${family.family.id}`} label={`${family.family.name}`} color="primary" variant="outlined" />
                                            ))
                                        }
                                    </Stack>
                                }

                            </Typography>
                        </Col>
                        <Col>
                            <Typography variant="overline" display="block" gutterBottom>
                                Version:
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {
                                    _.size(active_standard.versions) > 0 && <Stack direction="row" spacing={1}>
                                        {
                                            _.map(active_standard.versions, version => (
                                                <Chip key={`${version.version.id}`} label={`${version.version.name}`} color="primary" variant="outlined" />
                                            ))
                                        }
                                    </Stack>
                                }

                            </Typography>
                        </Col>
                        <Col>
                            <Typography variant="overline" display="block" gutterBottom>
                                Focus:
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {
                                    _.size(active_standard.focuses) > 0 && <Stack direction="row" spacing={1}>
                                        {
                                            _.map(active_standard.focuses, focus => (
                                                <Chip key={`${focus.focus.id}`} label={`${focus.focus.name}`} color="primary" variant="outlined" />
                                            ))
                                        }
                                    </Stack>
                                }

                            </Typography>
                        </Col>
                        <Col>
                            <Typography variant="overline" display="block" gutterBottom>
                                Statutes:
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {
                                    _.size(active_standard.statutes) > 0 && <Stack direction="row" spacing={1}>
                                        {
                                            _.map(active_standard.statutes, satue => (
                                                <Chip key={`${satue.satue.id}`} label={`${satue.satue.name}`} color="primary" variant="outlined" />
                                            ))
                                        }
                                    </Stack>
                                }

                            </Typography>
                        </Col>
                    </Row>
                </Card>

                <Accordion className='m-1'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Overview</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {active_standard.overview}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='m-1'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Scope</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {active_standard.scope}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='m-1'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Coverage</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {active_standard.coverage}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Col>
        </Row>
    );
}

export default StandardInformation