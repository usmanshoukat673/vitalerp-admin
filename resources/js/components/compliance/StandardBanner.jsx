import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CCActivities from './cc-category/CCActivities';
import RecentActivity from './cc-category/RecentActivity';
import { Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../../api/api';
const ControlsInfoChart = React.lazy(() => import('./cc-category/ControlsInfoChart'));

const StandardBanner = () => {

    const { parent_sections, standard, company, token } = useSelector((state) => ({
        parent_sections: state.leftnav.parent_sections,
        standard: state.leftnav.standard,
        token: state.token.activeToken,
        company: state.orgs.company,
    }));

    const [state, setState] = useState({
        errors: [],
        loading: false,
    });

    const [activities, setActivities] = useState([]);
    const [implemented_ctrls, setImplementedCtrls] = useState(0);
    const [partially_imple_ctrls, setPartiallyImpleCtrls] = useState(0);
    const [applicable_ctrls, setApplicableCtrls] = useState(0);
    const [not_applicable_ctrls, setNotApplicableCtrls] = useState(0);
    const [standard_doc_docunt, setStandarDocCount] = useState(0);

    const loadStdInfo = () => {

        setState({ ...state, errors: [] })

        axiosInstance.post(`/api/user/compliance/standard-info`, {
            comp_id: company.id,
            standard_id: standard.standard_id,
            getdocs: false
        })
            .then(e => {
                setState({
                    ...state,
                    errors: [],
                });

                setActivities(e.data.activities);
                setImplementedCtrls(e.data.implemented_ctrls);
                setPartiallyImpleCtrls(e.data.partially_imple_ctrls);
                setApplicableCtrls(e.data.applicable_ctrls);
                setNotApplicableCtrls(e.data.not_applicable_ctrls);

            })
            .catch(err => {
                if (err.response.status === 422) {
                    setState({ ...state, errors: state.errors.concat(err.response.data.errors), loading: false });
                }
            }).finally(() => {
                setState({ ...state, errors: [], loading: false });
            });
    }


    useEffect(() => {
        loadStdInfo();
    }, [company, standard]);

    useEffect(() => {
        let docCount = 0;
        _.forEach(parent_sections, (psection) => {
            docCount += _.size(psection.limitted_info.documents);
        });
        setStandarDocCount(docCount);
    }, [parent_sections]);

    return (
        <Row>
            <Col xl={{ span: 6, order: 1 }} lg={{ span: 12, order: 2 }}>
                <Card>
                    <Card.Body>
                        <div className='cs_banner'>
                            <div className="__piechart">
                                <div className="__pieheading">Overview</div>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ControlsInfoChart type="controls" series={[implemented_ctrls, partially_imple_ctrls, applicable_ctrls, 0, not_applicable_ctrls]} />
                                </Suspense>
                            </div>
                            <div className="__pienotes">
                                <div> <span className="n__fullyimpl __count">{implemented_ctrls}</span> Implemented</div>
                                <div><span className="n__partimpl __count">{partially_imple_ctrls}</span> Partially Implemented</div>
                                <div><span className="n__applicable __count">{applicable_ctrls}</span> Applicable</div>
                                <div> <span className="n__requiredatten __count">0</span> Excluded</div>
                                <div> <span className="n__not_applicable __count">{not_applicable_ctrls}</span> Not Applicable</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col xl={3} lg={{ span: 6, order: 1 }}>
                <Card>
                    <Card.Body>
                        <div className="__totaldocs">
                            <div className="__numberof_docs">
                                <div className='__count'>{standard_doc_docunt}</div>
                                <div>Documents</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col xl={3} lg={{ span: 6, order: 1 }}>
                <RecentActivity activities={activities} c_title={true} />
                {/* <CCActivities c_title={true} activities={activities} /> */}
            </Col>
        </Row>
    );
}

export default StandardBanner;