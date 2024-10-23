import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
const ControlsInfoChart = React.lazy(() => import('../cc-category/ControlsInfoChart'));

const StandardChart = () => {

    const { standard_info } = useSelector((state) => ({
        standard_info: state.compliance.standard_info,
    }));

    return (
        <Row>
            <Col xl={{ span: 12, order: 1 }} lg={{ span: 12, order: 2 }}>
                <Card style={{ marginBottom: '0px' }}>
                    <Card.Body style={{ padding: '10px' }}>
                        <div className='cs_banner'>
                            <div className="__piechart">
                                <div className="__pieheading">Overview</div>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ControlsInfoChart type="controls" series={[standard_info?.implemented_ctrls, standard_info?.partially_imple_ctrls, standard_info?.applicable_ctrls, standard_info?.excluded_ctrls, standard_info?.not_applicable_ctrls]} />
                                </Suspense>
                            </div>
                            <div className="__pienotes">
                                <div> <span className="n__fullyimpl __count">{standard_info?.implemented_ctrls}</span> Implemented</div>
                                <div><span className="n__partimpl __count">{standard_info?.partially_imple_ctrls}</span> Partially Implemented</div>
                                <div><span className="n__applicable __count">{standard_info?.applicable_ctrls}</span> Not Implemented</div>
                                <div> <span className="n__requiredatten __count">{standard_info?.excluded_ctrls}</span> Excluded</div>
                                <div> <span className="n__not_applicable __count">{standard_info?.not_applicable_ctrls}</span> Not Applicable</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default StandardChart;