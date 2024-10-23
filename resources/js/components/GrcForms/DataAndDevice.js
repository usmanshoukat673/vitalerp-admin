import React from 'react';
import PageTitle from '../sub-components/PageTitle';
import { FormInput } from '../sub-components/';
import { Progress } from 'semantic-ui-react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

const DataAndDevice = ({ history }) => {

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
        history.push(`/beta-form/backups`);
    }

    const next = () => {
        history.push(`/beta-form/incident`);
    }

    return (<div className='grc__froms'>
        <PageTitle
            breadCrumbItems={[
                { label: 'Forms', path: `/beta-form/data-and-device` },
                { label: 'Welcome', path: `/beta-form/data-and-device`, active: true },
            ]}
            title={'Data & Device Protection'}
        />

        <Card>
            <Card.Body>
                <h4 className="header-title">Name and address of firm</h4>

                <Row>
                    <Col lg={6}>
                        <form>


                            <FormInput
                                label="Full name"
                                type="text"
                                name="full_name"
                                placeholder="Full name"
                                containerClass={'mb-3'}
                                register={register}
                                key="full_name"
                                errors={errors}
                                control={control}
                            />

                            <FormInput
                                label="Address"
                                type="address"
                                name="address"
                                rows="5"
                                containerClass={'mb-3'}
                                register={register}
                                key="Address"
                                errors={errors}
                                control={control}
                            />

                            <FormInput
                                label="City"
                                type="text"
                                name="city"
                                placeholder="City"
                                containerClass={'mb-3'}
                                register={register}
                                key="city"
                                errors={errors}
                                control={control}
                            />

                            <FormInput
                                label="Zip Code/Postal Code"
                                type="text"
                                name="zip_code"
                                placeholder="Zip Code/Postal Code"
                                containerClass={'mb-3'}
                                register={register}
                                key="zip_code"
                                errors={errors}
                                control={control}
                            />




                        </form>
                    </Col>

                    <Col lg={6}>
                        <form >

                            <FormInput
                                label="Website"
                                type="text"
                                name="website"
                                placeholder="Website"
                                containerClass={'mb-3'}
                                register={register}
                                key="website"
                                errors={errors}
                                control={control}
                            />
                            <FormInput
                                label="State or Province"
                                type="text"
                                name="state"
                                placeholder="State or Province"
                                containerClass={'mb-3'}
                                register={register}
                                key="state"
                                errors={errors}
                                control={control}
                            />
                            <FormInput
                                label="Country"
                                type="text"
                                name="country"
                                placeholder="Country"
                                containerClass={'mb-3'}
                                register={register}
                                key="country"
                                errors={errors}
                                control={control}
                            />

                        </form>
                    </Col>
                </Row>
            </Card.Body>
        </Card>


        <Card>
            <Card.Body>
                <h4 className="header-title">Instructions</h4>
                <p className="text-muted">
                    The following questions are a combination of buttons <code>(select one)</code>, check boxes <code>(select all that apply)</code>, drop-down boxes <code>(select one)</code>, and text entry <code>(fill in the box)</code>. If additional information is desired or assists in clarifying your answers, comments and explanations can be included in a separate document.
                </p>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <h4 className="header-title">Technology Environment Basics</h4>

                <Row>
                    <Col lg={6}>
                        <form>
                            <FormInput
                                name="select"
                                label="Approx. Employee Count"
                                type="select"
                                containerClass="mb-3"
                                className="form-select"

                                key="emp_count"
                                errors={errors}
                                control={control}>
                                <option>1-10</option>
                                <option>10-20</option>
                                <option>20-30</option>
                                <option>30-40</option>
                                <option>40-50</option>
                            </FormInput>
                            <FormInput
                                name="select"
                                label="Approx. Computer User Count"
                                type="select"
                                containerClass="mb-3"
                                className="form-select"

                                key="user_count"
                                errors={errors}
                                control={control}>
                                <option>1-10</option>
                                <option>10-20</option>
                                <option>20-30</option>
                                <option>30-40</option>
                                <option>40-50</option>
                            </FormInput>
                            <FormInput
                                name="select"
                                label="Email Host"
                                type="select"
                                containerClass="mb-3"
                                className="form-select"

                                key="email_host"
                                errors={errors}
                                control={control}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </FormInput>
                            <FormInput
                                name="select"
                                label="IT & Cybersecurity Team"
                                type="select"
                                containerClass="mb-3"
                                className="form-select"

                                key="cyb_team"
                                errors={errors}
                                control={control}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </FormInput>
                        </form>
                    </Col>

                    <Col lg={6}>
                        <form >


                            <FormInput
                                label="Server Count - Onsite Physical"
                                type="text"
                                name="physical"
                                containerClass={'mb-3'}
                                register={register}
                                key="physical"
                                errors={errors}
                                control={control}
                            />
                            <FormInput
                                label="Server Count - Onsite Virtual"
                                type="text"
                                name="virtual"
                                containerClass={'mb-3'}
                                register={register}
                                key="virtual"
                                errors={errors}
                                control={control}
                            />
                            <FormInput
                                label="Server Count - Cloud Hosted"
                                type="text"
                                name="hosted"
                                containerClass={'mb-3'}
                                register={register}
                                key="hosted"
                                errors={errors}
                                control={control}
                            />
                        </form>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <div>
                    <Progress percent={70} success>
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

export default withRouter(DataAndDevice);
