import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BsGearFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import DigitalDocument from './DigitalDocument';
import PDFFile from './PDFFile';
import MSDocument from './MSDocument';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import './PPControls.scss';
import DocumentWithMenu from './DocumentWithMenu';
import showCurrentTZDate from '../../../utils/showCurrentTZDate';
import { msFiles } from '../../../utils';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PPControls = ({ history }) => {

    const { active_standard, active_parent_domain } = useSelector((state) => ({
        active_standard: state.policyportal.active_standard,
        active_parent_domain: state.policyportal.active_parent_domain
    }));

    const dispatch = useDispatch();

    // useEffect(() => {
    //     let controlIds = [];
    //     _.map(active_parent_domain.sections, section =>
    //         controlIds = [...controlIds, ..._.map(section.controls, 'id')]
    //     );
    //     console.log('controlIds', controlIds);
    // }, [active_parent_domain]);

    const renderDocument = (document) => {
        if (document.document.type == "document") {
            return (<DigitalDocument document={document} />);
        }
        else if (document.document.type == 'file' && document.document.ext == 'pdf') {
            return (<PDFFile document={document} />);
        }
        else if (document.document.type == 'file' && msFiles.includes(document.document.ext)) {
            return (<MSDocument document={document} />);
        }
    }


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <Row className="mx-n1 g-0">
            <Col>
                {_.map(active_parent_domain.sections, (section) => {
                    return <div key={section.id}>
                        <Typography variant="h6" gutterBottom className="p-2">
                            {section.menu_name}
                        </Typography>
                        {
                            _.map(section.controls, control => {
                                return (
                                    <div key={control.id} >
                                        <Row>
                                            <Col xs={12} md={12} className='control__name_conainer'>
                                                <div style={{ padding: '0 10px 2px 10px', fontSize: '17px', color: ' #686868' }}><BsGearFill /></div>
                                                <span className='document_heading' style={{ marginRight: '15px' }}> {`${control.number} ${control.name}`}</span>
                                            </Col>
                                        </Row>

                                        {
                                            _.size(control.mapped) > 0 && <div className='control__mappings_conainer'>
                                                <Accordion sx={{ border: 0, boxShadow: 'none' }}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                        sx={{ margin: 0, fontWeight: '600' }}
                                                    >
                                                        Mappings
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        {
                                                            _.map(control.mapped, map_control => {
                                                                if (!_.isEmpty(map_control.control)) {
                                                                    let randomColor = getRandomColor();
                                                                    const chipStyle = {
                                                                        backgroundColor: randomColor,
                                                                        color: '#fff',
                                                                        borderColor: randomColor,
                                                                        transition: 'background-color 0.3s', // Add a transition for a smooth effect
                                                                    };
                                                                    const hoverStyle = {
                                                                        backgroundColor: `${randomColor} !important`,
                                                                        borderColor: randomColor, // Adjust hover color as needed
                                                                    };
                                                                    return (<Chip onClick={() => { }} color='primary' key={map_control.control.id} label={`${map_control.control.number} ${map_control.control.name} - [${map_control.control.standard.name}]`} variant="outlined" />)
                                                                }
                                                            })
                                                        }
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>
                                        }

                                        <div className='policy__container'>
                                            {
                                                _.map(control.documents, (document) => {
                                                    return (
                                                        <Row key={`digital_document_${document.id}`}>
                                                            <Col xs={9} md={9} className='__document_placeholder'>
                                                                <Card className="m-1 shadow-none __policy_document">
                                                                    {renderDocument(document)}
                                                                </Card>
                                                            </Col>
                                                            <Col xs={3} md={3}>
                                                                <div className='__document__context'>
                                                                    <DocumentWithMenu htmlContent={document.document.content} />
                                                                </div>

                                                                <div>
                                                                    <h4 style={{ marginBottom: '5px' }}>Document Information</h4>
                                                                </div>
                                                                <div className='__document__info'>

                                                                    <div>
                                                                        Version: {document.document.version}
                                                                    </div>
                                                                    <div>
                                                                        Owner: {document.document.docowner && document.document.docowner.first_name} {document.document.docowner && document.document.docowner.last_name}
                                                                    </div>
                                                                    <div>
                                                                        Classification: {document.document.classification}
                                                                    </div>
                                                                    <div>
                                                                        Modified: {showCurrentTZDate(document.document.modified)}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    )

                                                })
                                            }
                                        </div>


                                    </div>
                                );
                            })
                        }
                    </div>
                })}
            </Col>
        </Row>
    );
}

export default withRouter(PPControls);