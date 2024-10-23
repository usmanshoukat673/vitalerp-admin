import React from 'react';
import PageTitle from '../sub-components/PageTitle';
import { Progress } from 'semantic-ui-react'
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const ThankYou = ({ history }) => {


    const previous = () => {
        history.push(`/beta-form/disclosure`);
    }

    return (<div className='grc__froms'>
        <PageTitle
            breadCrumbItems={[
                { label: 'Forms', path: `/beta-form/posture` },
                { label: 'Welcome', path: `/beta-form/posture`, active: true },
            ]}
            title={'Thank You'}
        />

        <Card>
            <Card.Body>
                <div className="text-center">
                    <h2 className="mt-0">
                        <i className="mdi mdi-check-all"></i>
                    </h2>
                    <h3 className="mt-0">Thank you !</h3>

                    <p className="w-75 mb-2 mx-auto">
                        Quisque nec turpis at urna dictum luctus. Suspendisse convallis
                        dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis dictum
                        aliquet.
                    </p>

                    <div className="mb-3">

                    </div>
                </div>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <div>
                    <Progress percent={100} success>
                    100% Completed.
                    </Progress>
                </div>
                <ul className="list-inline wizard mb-0">
                    <li className="previous list-inline-item">
                        <Button onClick={previous} variant="success">
                            Previous
                        </Button>
                    </li>
                </ul>
            </Card.Body>
        </Card>
    </div>)
}

export default withRouter(ThankYou);
