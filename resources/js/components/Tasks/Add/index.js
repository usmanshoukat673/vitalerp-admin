// @flow
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import PageTitle from '../../sub-components/PageTitle';

import Task from './Task';
import Attachments from './Attachments';
import './Details.scss';

// dummy data
import { Tasks } from './Data';

// AddTask
const AddTask = () => {
    const [selectedTask] = useState(Tasks[0]);

    return (
        <div className='__Details'>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Tasks', path: '/apps/tasks/list' },
                    { label: 'Add', path: '/apps/tasks/add', active: true },
                ]}
                title={'Add/Assign Task'}
            />
            <Row>
                <Col xxl={8} xl={7}>
                    <Task />
                </Col>
                <Col xxl={4} xl={5}>
                    {
                        // <Attachments />
                    }

                </Col>
            </Row>
        </div>
    );
};

export default AddTask;
