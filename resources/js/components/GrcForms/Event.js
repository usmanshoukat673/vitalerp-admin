import React from 'react';
import PageTitle from '../sub-components/PageTitle';
import Radio from '@mui/material/Radio';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Progress } from 'semantic-ui-react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

const Event = ({ history }) => {

    /*
     * form methods
     */
    const methods = useForm({
        defaultValues: {
            password: '12345',
            statictext: 'email@example.com',
            color: '#727cf5',
        },
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    const previous = () => {
        history.push(`/beta-form/aim`);
    }

    const next = () => {
        history.push(`/beta-form/asset`);
    }

    return (<div className='grc__froms'>
        <PageTitle
            breadCrumbItems={[
                { label: 'Forms', path: `/beta-form/posture` },
                { label: 'Welcome', path: `/beta-form/posture`, active: true },
            ]}
            title={'3. Event Monitoring'}
        />

        <Card>
            <Card.Body>
                <h4 className="header-title">19. Select one response: Which description best reflects the Applicant's security operations program?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`Applicant does not have anyone (internal or external) dedicated to monitoring security operations (a "Security Operations Center" or SOC).	`} />
                                <FormControlLabel value="2" control={<Radio />} label={`Applicant has a SOC, but it's not 24/7 (can be internal or external).`} />
                                <FormControlLabel value="3" control={<Radio />} label={`Applicant has 24/7 monitoring of security operations by a 3rd party (such as a Managed Security Services Provider).	`} />
                                <FormControlLabel value="4" control={<Radio />} label={`Applicant has 24/7 monitoring of security operations internally (regardless of whether or not a 3rd party is also used).`} />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">20. Select all responses that are true: With respect to the Applicant's security and network monitoring capabilities:</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`Applicant uses a "Security Information and Event Monitoring" or SIEM tool to correlate the output of multiple security tools.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant monitors network traffic for anomalous and potentially suspicious data transfers.		`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant monitors for performance and storage capacity issues on all servers (such as high memory or processor usage, or no free disk space).`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant monitors for any abnormal behavior related to service accounts?`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant has tools to monitor for data loss (DLP) and they are in blocking mode.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant has tools to monitor for data loss (DLP), but they are not in blocking mode.`} />
                            <FormControlLabel control={<Checkbox />} label={`None of the above/Don’t know.	`} />

                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">21. Select all responses that are true: With respect to the Applicant's monitoring of "Vital Assets":</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`The Applicant has an internal function and/or has an outsourced Managed Security Service Provider (“MSSP”) charged with monitoring security event alerts, including alerts on "Vital Assets" (a "Security Operations Center" or "SOC").	`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant's SOC/MSSP is provided an updated list of "Vital Assets" at least quarterly.	`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant's SOC/MSSP uses a Security Information and Event Monitoring (SIEM) solution to automate the collection of logs from "Vital Assets".`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">22. Does the Applicant ingest security logs from all Domain Controllers into their SIEM solution for analysis?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-2"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`Yes`} />
                                <FormControlLabel value="2" control={<Radio />} label={`No – Applicant doesn’t have a SIEM or doesn’t ingest security logs into SIEM  	`} />
                                <FormControlLabel value="3" control={<Radio />} label={`Not Applicable - not using directory services, IdP, rights management.`} />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">23. What percentage of the Applicant's "Vital Assets" are being logged and forwarded to a SIEM solution?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-3"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`0-30%`} />
                                <FormControlLabel value="2" control={<Radio />} label={`31-50%`} />
                                <FormControlLabel value="3" control={<Radio />} label={`51-70%`} />
                                <FormControlLabel value="4" control={<Radio />} label={`>= 71%`} />
                                <FormControlLabel value="5" control={<Radio />} label={`Don't know`} />
                                <FormControlLabel value="6" control={<Radio />} label={`Not applicable (no SIEM)`} />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">24. How long does the Applicant’s SIEM solution retain logs?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-4"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`Less than 30 days`} />
                                <FormControlLabel value="2" control={<Radio />} label={`30-59 days`} />
                                <FormControlLabel value="3" control={<Radio />} label={`60-89 days`} />
                                <FormControlLabel value="4" control={<Radio />} label={`90 days or more`} />
                                <FormControlLabel value="5" control={<Radio />} label={`Don't know`} />
                                <FormControlLabel value="6" control={<Radio />} label={`Not applicable (no SIEM)`} />

                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">25. Select all responses that are true:  With respect to the Applicant's capabilities to monitor for risky behavior and malicious insiders:</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`Applicant has an insider threat program.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant monitors for when a user or administrator account sets an insecure password.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant monitors for when “Privileged” accounts access unauthorized websites and services.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant monitors for unauthorized remote access to "Vital Assets".`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant monitors both user and administrator accounts for communication with known malicious websites, IP addresses, and other well-known threat group resources.`} />
                            <FormControlLabel control={<Checkbox />} label={`None of the above/Don’t know.`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">26. Select all responses that are true: With respect to the Applicant's capabilities to secure externally-exposed systems, including internet-facing systems:</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`Applicant maintains an inventory of externally-exposed assets.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant performs regular vulnerability scans of externally-exposed assets.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant has a Web Application Firewall (WAF) in front of all externally-exposed applications, and it is in blocking mode.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant scans externally-exposed assets for vulnerabilities at least monthly.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant uses an external service to monitor its attack surface (internet-facing systems).`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant disables or blocks on externally-exposed systems those ports, services, and protocols known to allow the spread of ransomware, including, but not limited to RDP, SMBv1, and SMBv2.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant’s externally-exposed assets are segmented within a demilitarized zone (DMZ), and the DMZ is not directly routable to the corporate network.  Users requiring access to DMZ services are routed to the internet for access.`} />
                            <FormControlLabel control={<Checkbox />} label={`Applicant can detect and respond to threats through endpoint and network monitoring solutions.`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">27. Select all responses that are true: What Audit Policies has the Applicant enabled on Domain Controllers?</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`Audit Credential Validation (Failure)`} />
                            <FormControlLabel control={<Checkbox />} label={`Audit Process Creation (Success)`} />
                            <FormControlLabel control={<Checkbox />} label={`Audit Security Group Management (Success and Failure)`} />
                            <FormControlLabel control={<Checkbox />} label={`Audit User Account Management (Success and Failure)`} />
                            <FormControlLabel control={<Checkbox />} label={`Audit Other Account Management Events (Success and Failure)	`} />
                            <FormControlLabel control={<Checkbox />} label={`Audit Sensitive Privilege Use (Success and Failure)	`} />
                            <FormControlLabel control={<Checkbox />} label={`Audit Logon (Success and Failure)`} />
                            <FormControlLabel control={<Checkbox />} label={`Audit Special Logon (Success)	`} />
                            <FormControlLabel control={<Checkbox />} label={`None of the above/Don't know.`} />
                            <FormControlLabel control={<Checkbox />} label={`Not applicable (not using Active Directory).`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">28. Does the Applicant implement PowerShell best practices as outlined in the Environment Recommendations by Microsoft?</h4>

                <Row>
                    <Col lg={12}>
                    <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group-5"
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Yes" />
                        <FormControlLabel value="2" control={<Radio />} label="No" />

                    </RadioGroup>
                </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <div>
                    <Progress percent={40} success>
                    </Progress>
                </div>
                <ul className="list-inline wizard mb-0">
                    <li className="previous list-inline-item">
                        <Button onClick={previous} variant="success">
                            Previous
                        </Button>
                    </li>
                    <li className="next list-inline-item float-end">
                        <Button onClick={next} variant="success">
                            Next
                        </Button>
                    </li>
                </ul>
            </Card.Body>
        </Card>
    </div>)
}

export default withRouter(Event);
