import React from 'react';
import PageTitle from '../sub-components/PageTitle';
import Radio from '@mui/material/Radio';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { FormInput } from '../sub-components/';
import { Progress } from 'semantic-ui-react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

const Aim = ({ history }) => {

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
        history.push(`/beta-form/posture`);
    }

    const next = () => {
        history.push(`/beta-form/event`);
    }

    return (<div className='grc__froms'>
        <PageTitle
            breadCrumbItems={[
                { label: 'Forms', path: `/beta-form/posture` },
                { label: 'Welcome', path: `/beta-form/posture`, active: true },
            ]}
            title={'2. Account & Identity Management'}
        />

        <Card>
            <Card.Body>
                <h4 className="header-title">5. Select one response: What is the source of identity for the majority of Applicant’s users?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`Microsoft Active Directory (Active Directory)`} />
                                <FormControlLabel value="2" control={<Radio />} label={`Azure Active Directory (Azure AD)`} />
                                <FormControlLabel value="3" control={<Radio />} label={`Active Directory and Azure AD (Active Directory is authoritative)`} />
                                <FormControlLabel value="4" control={<Radio />} label={`Azure AD and Active Directory (Azure AD is authoritative)`} />
                                <FormControlLabel value="5" control={<Radio />} label={`An Identity Provider ("IdP"; e.g., Okta or Ping)`} />
                                <FormControlLabel value="6" control={<Radio />} label={`Cloud-based collaboration (e.g., Google Workspace)`} />
                                <FormControlLabel value="7" control={<Radio />} label={`Other (details required – provide in the next row) `} />
                                <FormControlLabel value="8" control={<Radio />} label={`If Other provide details here`} />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">6. Select all responses that are true: Which of the following tools does the Applicant use for directory services, identity providers (IdP), federation and/or rights management?</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`Microsoft Active Directory (Active Directory)`} />
                            <FormControlLabel control={<Checkbox />} label={`Azure Active Directory (Azure AD)`} />
                            <FormControlLabel control={<Checkbox />} label={`Okta`} />
                            <FormControlLabel control={<Checkbox />} label={`Ping`} />
                            <FormControlLabel control={<Checkbox />} label={`Active Directory Federation Services`} />
                            <FormControlLabel control={<Checkbox />} label={`Google Workspace`} />
                            <FormControlLabel control={<Checkbox />} label={`Other (details required – provide in the next row) `} />
                            <FormControlLabel control={<Checkbox />} label={`None of the above/Don’t Know.`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">7. Select all responses that are true: With respect to the Applicant's account management:				</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`The Applicant has an inventory of all user and administrative accounts.`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant's inventory of accounts includes the individual's name, username, start/stop dates, and department.`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant validates that all active accounts are authorized, at least annually.`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant validates that all active accounts are authorized, at least quarterly.`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">8. Select all responses that are true: With respect to the Applicant's policies and technical controls on passwords:</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`The Applicant educates users on the risks of password reuse and has a policy against it.`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant has a solution to prevent users from setting common and known-breached passwords, even if they meet complexity requirements (such as "1q2w3e4r5t" and "Passw0rd!").`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant provides a password manager to its employees.`} />
                            <FormControlLabel control={<Checkbox />} label={`The Applicant has implemented a solution to set different, random passwords across all domain-attached computers for local administrator accounts (i.e., Local Administrator Password Solution - Reference:  https://support.microsoft.com/en-us/topic/microsoft-security-advisory-local-administrator-password-solution-laps-now-available-may-1-2015-404369c3-ea1e-80ff-1e14-5caafb832f53).`} />
                            <FormControlLabel control={<Checkbox />} label={`None of the above.`} />

                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">9. Select all responses that are true: With regards to how the Applicant protects user accounts with domain administrative privileges ("Domain Administrator Accounts"): Domain Administrator Accounts means those user accounts - excluding "Service Accounts" - which can edit information in whatever solution the Applicant is using for directory services, identity provider (IdP), rights management, etc.  In an Active Directory environment, this would include Enterprise Admins, Domain Admins, and the (domain) Administrators groups (and any nested groups/accounts); in Azure AD this would include Global Administrators, Hybrid Identity Administrators, and Privileged Role Administrators).</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`System administrators at the Applicant have a unique, privileged credential for administrative tasks (separate from their user credentials for everyday access, email, etc.).	`} />
                            <FormControlLabel control={<Checkbox />} label={`Domain Administrator Accounts require multifactor authentication.`} />
                            <FormControlLabel control={<Checkbox />} label={`Domain Administrator Accounts are managed and monitored through just-in-time access, are time bound, and require approvals to provide privileged access.`} />
                            <FormControlLabel control={<Checkbox />} label={`Domain Administrator Accounts are kept in a password safe that requires the user to "check out" the credential (which is rotated afterwards).`} />
                            <FormControlLabel control={<Checkbox />} label={`In addition to being kept in a password safe, "Domain Administrator Accounts" are not exposed to the administrative user when "checked out", and access is recorded through a session manager.`} />
                            <FormControlLabel control={<Checkbox />} label={`Domain Administrator Accounts can only be used from Privileged Access Workstations (workstations that do not have access to internet or email).	`} />
                            <FormControlLabel control={<Checkbox />} label={`There is a log of all actions by "Domain Administrator Accounts" for at least the last thirty days.	`} />
                            <FormControlLabel control={<Checkbox />} label={`None of the above/Don’t Know.`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">10. Select one response: How do the Applicant's employees authenticate to remotely access the corporate network?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-2"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`Remote access to the corporate network generally only requires a valid username and password (single factor authentication).`} />
                                <FormControlLabel value="2" control={<Radio />} label={`Multi-factor authentication (MFA) is in place for some types of remote access to the corporate network, but not others.`} />
                                <FormControlLabel value="3" control={<Radio />} label={`MFA is required by policy for all remote access to the corporate network, and all exceptions to the policy are documented.`} />
                                <FormControlLabel value="4" control={<Radio />} label={`Applicant does not provide remote access to any employees.`} />

                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">11. Select one response: How do vendors of the Applicant authenticate to remotely access the corporate network?</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-3"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`Remote access to the corporate network generally only requires a valid username and password (single factor authentication).`} />
                                <FormControlLabel value="2" control={<Radio />} label={`MFA is in place for some types of remote access to the corporate network, but not others.`} />
                                <FormControlLabel value="3" control={<Radio />} label={`MFA is required by policy for all remote access to the corporate network, and all exceptions to the policy are documented.`} />
                                <FormControlLabel value="4" control={<Radio />} label={`Applicant does not provide remote access to any vendors.`} />

                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">12. Select one response: How do both employees and vendors of the Applicant authenticate to those Vital Assets which are SaaS/3rd party applications?				</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-4"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`Access to externally hosted Vital Assets generally only requires a valid username and password (single factor authentication).`} />
                                <FormControlLabel value="2" control={<Radio />} label={`MFA is in place for some types of access to externally hosted Vital Assets, but not others.`} />
                                <FormControlLabel value="3" control={<Radio />} label={`MFA is required by policy for all access to externally hosted Vital Assets, and all exceptions to the policy are documented.`} />
                                <FormControlLabel value="4" control={<Radio />} label={`Applicant does not use SaaS/3rd party hosted applications which would be considered Vital Assets.`} />

                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">13. Select all responses that are true: With regards to how the Applicant protects "Privileged" "Service Accounts": Service Accounts are accounts used for running applications and other processes; they are not typically used by people outside troubleshooting.  "Privileged" means having elevated privileges, and in an Active Directory environment, includes, but is not limited to, Enterprise Admins, Domain Admins, and (domain) Administrators.</h4>

                <Row>
                    <Col lg={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={`There is an inventory of all "Privileged" "Service Accounts", and it is updated at least quarterly.	`} />
                            <FormControlLabel control={<Checkbox />} label={`Privileged "Service Accounts" have password lengths of at least 25 characters.`} />
                            <FormControlLabel control={<Checkbox />} label={`Privileged "Service Accounts" have their passwords rotated at least annually.`} />
                            <FormControlLabel control={<Checkbox />} label={`Privileged "Service Accounts" have their passwords rotated at least quarterly.`} />
                            <FormControlLabel control={<Checkbox />} label={`Privileged "Service Accounts" are managed by a PAM solution or password vault`} />
                            <FormControlLabel control={<Checkbox />} label={`Service Accounts are tiered such that different accounts are used to interact with workstations, servers, and authentication servers, even for the same service.`} />
                            <FormControlLabel control={<Checkbox />} label={`There is a process in place to review at least annually the current requirements for each service associated with "Privileged" "Service Accounts" to verify the service still requires the permissions the service account has (and deprivilege if not).`} />
                            <FormControlLabel control={<Checkbox />} label={`None of the above/Don’t know.`} />
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">14. Select one response: Authenticator Assurance Level (AAL) which best represents the Applicant's authentication solution(s). NIST Special Publication 800-63B defines the Authenticator Assurance Levels.</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-5"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`AAL1`} />
                                <FormControlLabel value="2" control={<Radio />} label={`AAL2`} />
                                <FormControlLabel value="3" control={<Radio />} label={`AAL3`} />
                                <FormControlLabel value="4" control={<Radio />} label={`Don't know.`} />

                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">15. Provide the number of active accounts the Applicant has for the categories below.  Accounts should not include inactive accounts but should include all nested accounts aggregated across all domains/forests.				</h4>

                <Row>
                    <Col lg={12}>
                        <FormInput
                            label={`Number of "Domain Administrator Accounts":`}
                            type="text"
                            name="ad_account"
                            containerClass={'mb-3'}
                            register={register}
                            key="full_name"
                            errors={errors}
                            control={control}
                        />

                        <FormInput
                            label={`Number of "Privileged" "Services Accounts":`}
                            type="text"
                            name="ser_Accounts"
                            containerClass={'mb-3'}
                            register={register}
                            key="full_name"
                            errors={errors}
                            control={control}
                        />

                        <p className='text-muted'>
                            NOTE: For each "Privileged" "Service Account", use the table provided at the end of the supplemental to indicate i) the name of the account, ii) the privileges it has, iii) the software it supports, iv) what hosts the service account is authenticating to, and v) why those entitlements are required.
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">16. Select one response: Which description below best reflects the Applicant's posture with respect to access controls for each user's workstation? For the purposes of this question, where the Applicant is using an endpoint privilege manager or other similar technology to allow users to temporarily request administrative access for certain activities, that should not be considered "admin access".</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-5"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`No user’s regular, every day account is in the Administrator's group or has local admin access to their workstation.`} />
                                <FormControlLabel value="2" control={<Radio />} label={`Applicant's policy is that employees by default are not in the Administrators' group and do not have local admin access; all exceptions to the policy are documented.`} />
                                <FormControlLabel value="3" control={<Radio />} label={`Some of the Applicant's employees are in the Administrators' group or are local admins.`} />

                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <h4 className="header-title">17. Select one response: Which description best reflects the Applicant's posture with respect to access controls for member servers? This question is regarding employees' everyday user accounts; where the Applicant provisions employees with separate credentials for administrative access, those accounts should not be considered for the purposes of this question.</h4>

                <Row>
                    <Col lg={12}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group-5"
                            >
                                <FormControlLabel value="1" control={<Radio />} label={`No employees are in the Administrator's group or have local admin access to member servers.`} />
                                <FormControlLabel value="2" control={<Radio />} label={`Applicant's policy is that employees by default are not in the Administrators' group and do not have local admin access; all exceptions to the policy are documented.`} />
                                <FormControlLabel value="3" control={<Radio />} label={`Some of the Applicant's employees are in the Administrators' group or are local admins.`} />
                                <FormControlLabel value="4" control={<Radio />} label={`Don't know.`} />

                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">18. How many of the Applicant's users have persistent administrative access to servers and/or workstations other than their own?  For the purposes of this question, "administrative access" means entitlements to configure, manage and otherwise support these endpoints, including through the use of a unique administrative account (separate from their everyday user account).  Users who must "check out" credentials for administrative access should not be included.				</h4>

                <Row>
                    <Col lg={12}>
                        <FormInput
                            label={`":`}
                            type="text"
                            name="18ad_account"
                            containerClass={'mb-3'}
                            register={register}
                            key="full_name"
                            errors={errors}
                            control={control}
                        />


                    </Col>
                </Row>
            </Card.Body>
        </Card>


        <Card>
            <Card.Body>
                <div>
                    <Progress percent={30} success>
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

export default withRouter(Aim);
