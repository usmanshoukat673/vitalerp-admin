// @flow
import classNames from 'classnames';
import React from 'react';
import { Card, Col } from 'react-bootstrap';

// component
import CardTitle from '../../sub-components/CardTitle';


const Statistics = ({ statisticsData })=> {
    return (
        <>
            {(statisticsData || []).map((statistics, i) => {
                return (
                    <Col xl={3} sm={6} key={i}>
                        <Card>
                            <Card.Body>
                                <CardTitle
                                    containerClass="d-flex align-items-center justify-content-between"
                                    title={
                                        <>
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar-sm">
                                                    <span
                                                        className={classNames(
                                                            'avatar-title',
                                                            'bg-' + statistics.variant + '-lighten',
                                                            'text-' + statistics.variant,
                                                            'rounded'
                                                        )}>
                                                        <i className={classNames(statistics.icon, 'font-24')}></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="mt-0 mb-1">{statistics.title}</h5>
                                                <p className="mb-0">{statistics.noOfProject}</p>
                                            </div>
                                        </>
                                    }
                                    menuItems={[
                                        { label: 'Today' },
                                        { label: 'Yesterday' },
                                        { label: 'Last Week' },
                                        { label: 'Last Month' },
                                    ]}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </>
    );
};

export default Statistics;
