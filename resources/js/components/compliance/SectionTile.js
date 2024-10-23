import React, { useState } from 'react';
import { Grid, Modal, Dropdown, Popup } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import SectionControlsInfoChart from './cc-category/SectionControlsInfoChart';
import axiosInstance from '../../api/api';
import CCActivities from './cc-category/CCActivities';
import { FiArrowRight } from "react-icons/fi";
import SectionOwner from './SectionOwner';
import SectionCustodian from './SectionCustodian';
import PSectionLikeButton from './PSectionLikeButton';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { setSelectedTask, setBackPageURL, setLastActiveSectionId } from '../../actions';
import './SectionTile.scss';
import { useDispatch, useSelector } from 'react-redux';

const SectionTile = ({ company, token, standard, psection, sectionInfoChanged, history, useActiveSectionDocuments, navigate, subnavigate,  users, sectionLiked}) => {
    const [show_button, setShowButton] = useState(false);
    const [stricty, setStricty] = useState(false);
    const [mid_section, setMidSection] = useState('summary');
    const [implemented_ctrls, setImplementedCtrls] = useState(0);
    const [partially_imple_ctrls, setPartiallyImpleCtrls] = useState(0);
    const [applicable_ctrls, setApplicablectrls] = useState(0);
    const [not_applicable_ctrls, setNotApplicableCtrls] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [owner, setOwner] = useState(false);
    const [custodian, setCustodian] = useState(false);

    const {last_active_section_id} = useSelector((state) => ({
        last_active_section_id: state.compliance.last_active_section_id
    }));

    const dispatch = useDispatch();

    const openSectionStory = () => {
        setErrors([]);
        setLoading(true);

        let sections = _.map(psection.sections, csection => csection.id);

        axiosInstance.post(`/api/user/compliance/section-info-limmited`, {
            standard_id: standard.standard_id,
            sections: sections
        })
            .then(e => {

                setErrors([]);
                setLoading(false);
                setStricty(true);
                setActivities(e.data.activities);
                setImplementedCtrls(e.data.implemented_ctrls);
                setApplicablectrls(e.data.applicable_ctrls);
                setNotApplicableCtrls(e.data.not_applicable_ctrls);
                setPartiallyImpleCtrls(e.data.partially_imple_ctrls);
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            })
            .finally(() => {
                setErrors([]);
                setLoading(false);
            });
    };

    const closeSectionStory = () => {
        setStricty(false);
    };

    const openOwner = () => {
        setOwner(true);
    };

    const closeOwner = () => {
        setOwner(false);
    };

    const savedOwnerInfo = info => {
        sectionInfoChanged(psection, info);
        setOwner(false);
    }

    const handleLiked = like => {
        sectionLiked(psection, like);
    }

    const openCustodian = () => {
        setCustodian(true);
    };

    const closeCustodian = () => {
        setCustodian(false);
    };

    const toggleSectionSpan = section => {
        if (mid_section === section) {
            setMidSection('');
        }
        else {
            setMidSection(section);
        }
    }

    const getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    const listActionalbeItems = (sections) => {

        let tasks = [];

        _.forEach(sections, section => {
            _.forEach(section.controls, control => {
                if (_.size(control.tasks) > 0) {
                    _.forEach(control.tasks, t => {
                        if (!_.isEmpty(t.task)) {
                            tasks.push(t);
                        }

                    })
                }
            })
        })

        if (_.size(tasks) > 0) {
            return _.map(tasks, t => {
                return (<div key={t.task_id} className="at__action chand" onClick={() => handleTaskView(t.task_id)}>{t.task.title}</div>)
            })
        }
        else {
            return (<div className="at__action">Records not found.</div>)
        }
    }

    const handleTaskView = (task_id) => {

        let url = `/${company.slug}/compliance/${psection.slug}`;
        dispatch(setBackPageURL(url));

        axiosInstance.post(`/api/user/projects/task`, {
            task_id: task_id,
        })
            .then(e => {
                dispatch(setSelectedTask(e.data.task));
                history.push(`/${company.slug}/workbench/tasks/details/${task_id}`);
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            }).finally(() => {
                setErrors([]);
                setLoading(false);
            });
    }

    const handleMouseEnter = () => {
        setShowButton(true);
        dispatch(setLastActiveSectionId(psection.id, psection.menu_name));
        useActiveSectionDocuments(psection.limitted_info.documents);
    }

    return (
        <>
            <Grid.Column className="SectionTile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setShowButton(false)}>
                <div className={(show_button == true || stricty == true || last_active_section_id == psection.id) ? '__maincategory active' : '__maincategory'} >
                    <div className="__mcHeader" >

                        <div className="__mcTitle" onClick={() => { navigate(psection) }} >{psection.menu_name}</div>

                        <div className="__mcrightSection">

                            <div className="__respo__users">

                                {
                                    _.map(psection.owners, us => {
                                        return (
                                            <Popup
                                                content="Owner"
                                                key={`owner-${us.user_id}`}
                                                header={us.user.first_name + ' ' + us.user.last_name}
                                                trigger={<div className="__theUser __theAcUser">
                                                    {getInitial(us.user.first_name + ' ' + us.user.last_name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(psection.owner_teams, te => {
                                        return (
                                            <Popup
                                                content="Owner"
                                                key={`oteams-${te.team_id}`}
                                                header={te.team.name}
                                                trigger={<div className="__theUser __theAcUser">
                                                    {getInitial(te.team.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(psection.owner_thirdparty, tp => {
                                        return (
                                            <Popup
                                                content="Third Party"
                                                key={`othirdparty-${tp.tp_id}`}
                                                header={tp.thirdparty.name}
                                                trigger={<div className="__theUser __theAcUser">
                                                    {getInitial(tp.thirdparty.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(psection.custodians, us => {
                                        return (
                                            <Popup
                                                content="Custodian"
                                                key={`custodian-${us.user_id}`}
                                                header={us.user.first_name + ' ' + us.user.last_name}
                                                trigger={<div className="__theUser __theTeam">
                                                    {getInitial(us.user.first_name + ' ' + us.user.last_name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(psection.custodian_teams, te => {
                                        return (

                                            <Popup
                                                content="Custodian"
                                                key={`cteams-${te.team_id}`}
                                                header={te.team.name}
                                                trigger={<div className="__theUser __theTeam">
                                                    {getInitial(te.team.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(psection.custodian_thirdparty, tp => {
                                        return (
                                            <Popup
                                                content="Third Party"
                                                key={`cthirdparty-${tp.tp_id}`}
                                                header={tp.thirdparty.name}
                                                trigger={<div className="__theUser __theTeam">
                                                    {getInitial(tp.thirdparty.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }
                            </div>

                            <div className="__shortCutDD" >

                                <Dropdown text='' icon="ellipsis vertical">
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='Responsibilities' onClick={openOwner} />
                                        <Dropdown.Item text='Save as...' description='ctrl + s' />
                                        <Dropdown.Item text='Rename' description='ctrl + r' />
                                        <Dropdown.Item text='Make a copy' />
                                        <Dropdown.Item icon='folder' text='Move to folder' />
                                        <Dropdown.Item icon='trash' text='Move to trash' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item text='Download As...' />
                                        <Dropdown.Item text='Publish To Web' />
                                        <Dropdown.Item text='E-mail Collaborators' />
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>
                        </div>


                    </div>



                    {_.map(psection.sections, _csection => {
                        return (
                            <div onClick={() => { subnavigate(psection, _csection.slug) }} key={_csection.id} className="__mcSubSections">{_csection.menu_name}</div>
                        )
                    })}

                    <div className="the__limitted__info">

                        <div className="__ss__menubar">
                            <div onClick={() => { toggleSectionSpan('summary') }} className={mid_section === 'summary' ? '__ssm__item __sactive' : '__ssm__item'}>Summary</div>
                            <div onClick={() => { toggleSectionSpan('activity') }} className={mid_section === 'activity' ? '__ssm__item __sactive' : '__ssm__item'}>Activity</div>
                        </div>

                        {
                            mid_section === 'summary' && <div className="__ss__sumary__section">
                                <div className="__sss__chart">
                                    <div className="__cheading">Controls</div>
                                    <div className="__cchart">
                                        <div className="__cchart__container">
                                            <SectionControlsInfoChart series={[psection.limitted_info.applicable_ctrls, psection.limitted_info.not_applicable_ctrls, psection.limitted_info.implemented_ctrls, psection.limitted_info.partially_imple_ctrls, 0]} />
                                        </div>
                                        <div className="__cchart__info">
                                            <div><span className="cn__applicable c__count"></span> Applicable ({psection.limitted_info.applicable_ctrls})</div>
                                            <div> <span className="cn__not_applicable c__count"></span> Not Applicable ({psection.limitted_info.not_applicable_ctrls})</div>
                                            <div> <span className="cn__fullyimpl c__count"></span> Implemented ({psection.limitted_info.implemented_ctrls})</div>
                                            <div><span className="cn__partimpl c__count"></span> Partially Implemented ({psection.limitted_info.partially_imple_ctrls})</div>
                                            <div> <span className="cn__requiredatten c__count"></span> Excluded (0)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="__ss__aitems">
                                    <div className="__aheading">Actionable Items</div>
                                    <div className="__action__items">
                                        {
                                            listActionalbeItems(psection.sections)
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            mid_section === 'activity' && <div className="__ss__activity__section">
                                <CCActivities c_title={false} activities={psection.limitted_info.activities} />
                            </div>
                        }

                    </div>

                </div>

                <PSectionLikeButton
                    psection={psection}
                    company={company}
                    token={token}
                    liked={handleLiked}
                    standard={standard.standard}
                    parent={true}
                    like={psection.like}
                />

                {
                    /**
                      (show_button == true || stricty == true) && <div onClick={openSectionStory} className={stricty == true ? 'section__button active' : 'section__button'}>
                        <div className="section__button__innner">
                            <AspectRatioIcon className="aspect__ratio" />
                        </div>
                    </div>
                     */

                    (show_button == true || stricty == true) && <div onClick={() => { navigate(psection) }} className={stricty == true ? 'section__button active' : 'section__button'}>
                        <div className="section__button__innner">
                            <FiArrowRight className="aspect__ratio" />
                        </div>
                    </div>
                }

                {
                    owner && <SectionOwner
                        standard={standard.standard}
                        users={users}
                        open={owner}
                        close={closeOwner}
                        saved={savedOwnerInfo}
                        psection={psection}
                        company={company}
                        token={token}
                    />
                }

                {
                    custodian && <SectionCustodian
                        standard={standard}
                        users={users}
                        open={custodian}
                        close={closeCustodian}
                        psection={psection}
                        company={company}
                        token={token}
                    />
                }

                <Modal
                    className="semtic__modal sectonstory__modal"
                    onClose={() => { }}
                    open={stricty}
                    size="small"
                >
                    <Modal.Content className="sectonstory_modal_container">
                        <div className="sss__header">
                            <div className="__ss__number">
                                {psection.menu_name}
                            </div>
                            <div className="__ss__close">
                                <CloseIcon onClick={closeSectionStory} />
                            </div>
                        </div>
                        <div className="ss__labels">
                            <div className="ss__label">Needs attention</div>
                        </div>

                        <div className="__ss__menubar">
                            <div onClick={() => { toggleSectionSpan('summary') }} className={mid_section === 'summary' ? '__ssm__item __sactive' : '__ssm__item'}>Summary</div>
                            <div onClick={() => { toggleSectionSpan('activity') }} className={mid_section === 'activity' ? '__ssm__item __sactive' : '__ssm__item'}>Activity</div>
                        </div>

                        {
                            mid_section === 'summary' && <div className="__ss__sumary__section">
                                <div className="__sss__chart">
                                    <div className="__cheading">Controls</div>
                                    <div className="__cchart">
                                        <div className="__cchart__container">
                                            <SectionControlsInfoChart series={[applicable_ctrls, not_applicable_ctrls, implemented_ctrls, partially_imple_ctrls, 0]} />
                                        </div>
                                        <div className="__cchart__info">
                                            <div><span className="cn__applicable c__count"></span> Applicable ({applicable_ctrls})</div>
                                            <div> <span className="cn__not_applicable c__count"></span> Not Applicable ({not_applicable_ctrls})</div>
                                            <div> <span className="cn__fullyimpl c__count"></span> Implemented ({implemented_ctrls})</div>
                                            <div><span className="cn__partimpl c__count"></span> Partially Implemented ({partially_imple_ctrls})</div>
                                            <div> <span className="cn__requiredatten c__count"></span> Excluded (0)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="__ss__aitems">
                                    <div className="__aheading">Actionable Items</div>
                                    <div className="__action__items">
                                        {
                                            //  listActionalbeItems(psection.sections)
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            mid_section === 'activity' && <div className="__ss__activity__section">
                                <CCActivities c_title={false} activities={activities} />
                            </div>
                        }

                    </Modal.Content>

                </Modal>


            </Grid.Column>
        </>
    );
}

export default withRouter(SectionTile);