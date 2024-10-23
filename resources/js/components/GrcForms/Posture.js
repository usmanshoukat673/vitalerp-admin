import React from 'react';
import PageTitle from '../sub-components/PageTitle';
import Radio from '@mui/material/Radio';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { Progress } from 'semantic-ui-react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

const Posture = ({ history }) => {

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
        history.push(`/beta-form/welcome`);
    }

    const next = () => {
        history.push(`/beta-form/aim`);
    }

    return (<div className='grc__froms'>
        <PageTitle
            breadCrumbItems={[
                { label: 'Forms', path: `/beta-form/posture` },
                { label: 'Welcome', path: `/beta-form/posture`, active: true },
            ]}
            title={'1. Information Security Program Posture'}
        />

        <Card>
            <Card.Body>
                <h4 className="header-title">1. How centralized is the Applicant's information security program?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Information security at the Applicant is centrally managed, and the policies apply to all operations.  Where exceptions are made, it’s by asset only (as opposed to by operation/legal entity)." />
                                <FormControlLabel value="2" control={<Radio />} label="Information security at the Applicant is centrally managed, but exceptions are made for certain operation/legal entities.  The controls as outlined below apply to greater than or equal to 98% of total endpoints." />
                                <FormControlLabel value="3" control={<Radio />} label="Information security at the Applicant is centrally managed, but exceptions are made for certain operation/legal entities.  The controls as outlined below apply to less than 98% of total endpoints." />
                                <FormControlLabel value="4" control={<Radio />} label="Information security at the Applicant is federated, but the controls outlined below apply to greater than or equal to 98% of total endpoints." />
                                <FormControlLabel value="5" control={<Radio />} label="Information security at the Applicant is federated, and the controls outlined below apply to greater than 50% of total endpoints, but less than 98% of total endpoints." />
                                <FormControlLabel value="6" control={<Radio />} label="Information security is managed by individual legal entities or operating units.  The controls below are based on a survey of all entities and operating units." />
                                <FormControlLabel value="7" control={<Radio />} label="Don’t know/Other - Add addendum if Other" />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">2. Select all responses that are true:  With respect to the Applicant's policies for the use of organizational IT assets:</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label='The Applicant has an "Acceptable Use Policy" (AUP) outlining users obligations and constraints.' />
                            <FormControlLabel control={<Checkbox />} label="The AUP describes consequences for policy violations." />
                            <FormControlLabel control={<Checkbox />} label="Users are disallowed from surfing social media platforms from organizational assets except where this is a defined business need." />
                            <FormControlLabel control={<Checkbox />} label="Users are disallowed from accessing personal email from organizational assets." />
                            <FormControlLabel control={<Checkbox />} label="Administrators are explicitly disallowed from surfing the internet or accessing personal email from their privileged accounts." />
                            <FormControlLabel control={<Checkbox />} label="Users and administrators are responsible for keeping their computer and accounts safe from common risks or issues." />
                            <FormControlLabel control={<Checkbox />} label="Users and administrators are required to report suspected violations." />
                            <FormControlLabel control={<Checkbox />} label="None of the above/Don’t know.	" />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">3. Select all responses that are true: With respect to the roles of third parties or Managed Service Providers (MSPs) for the Applicant's network, including remote access to resources such as cloud and VPNs.</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label='Applicant utilizes an MSP for administration of "Vital Assets".' />
                            <FormControlLabel control={<Checkbox />} label='Applicant utilizes an MSP for security operations.' />
                            <FormControlLabel control={<Checkbox />} label='Applicant utilizes an MSP for data backup and recovery.' />
                            <FormControlLabel control={<Checkbox />} label='Applicant utilizes an MSP for cloud transformation.' />
                            <FormControlLabel control={<Checkbox />} label='Applicant utilizes an MSP for software development.' />
                            <FormControlLabel control={<Checkbox />} label={`Applicant provides third parties persistent (" always on") access to corporate resources (access does not require Applicant's authorization).`} />
                            <FormControlLabel control={<Checkbox />} label="None of the above/Don’t know." />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">4. Does the Applicant have a process or technical solution to identify, assess, manage, monitor, and reduce the risks from MSPs and third parties?</h4>

                <Row>
                    <Col lg={12}>
                    <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group-2"
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
                    <Progress percent={20} success>
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

export default withRouter(Posture);
