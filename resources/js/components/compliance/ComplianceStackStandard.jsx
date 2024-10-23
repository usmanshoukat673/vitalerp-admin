import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSubLeftNav, selectCatalogSection, setParentSections, selectCatalogParentSection, changeSidebarType, changePageAreaState, toggleTreeViewArea } from '../../actions';
import _ from 'lodash';
import { useParams, withRouter } from 'react-router-dom';
import StandardBanner from './StandardBanner';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';
import ShareStandard from './ShareStandard';
import StandardTabs from './StandardTabs';
import * as layoutConstants from '../../constants/layout';


const ComplianceStackStandard = ({ company, history }) => {

    const [active_control, setActiveControl] = useState({});

    const { standard, parent_sections, open_sub, last_active_section_id, layoutType, leftSideBarType } = useSelector((state) => ({
        standard: state.leftnav.standard,
        parent_sections: state.leftnav.parent_sections,
        open_sub: state.leftnav.open_sub,
        last_active_section_id: state.compliance.last_active_section_id,
        layoutType: state.leftnav.layoutType,
        leftSideBarType: state.leftnav.leftSideBarType,
    }));

    const [state, setState] = useState({
        errors: [],
        loading: false,
    });

    const [openSwitchCompl, setOpenSwitchCompl] = useState('');
    const [standard_name, setStandardName] = useState('');
    const [active_section_documents, setActiveSectionDocuments] = useState([]);
    

    const dispatch = useDispatch();
    const params = useParams();

    // useEffect(() => {
    //     let docCount = 0;
    //     _.forEach(parent_sections, (psection) => {
    //         docCount += _.size(psection.limitted_info.documents);
    //     });
    //     setStandarDocCount(docCount);
    // }, [parent_sections, active_section_documents]);

    useEffect(() => {
        dispatch(closeSubLeftNav());
        dispatch(toggleTreeViewArea({
            open: true,
            type: 'cs'
        }));
        dispatch(changeSidebarType('condensed'));
        dispatch(changePageAreaState(layoutConstants.CENTER_PAGE_AREA_STATE));
    }, [standard]);

    useEffect(() => {
        setStandardName(params.standard_name);
    }, [params.standard_name]);

    const handleNavigation = section => {
        dispatch(selectCatalogSection(section));
        history.push(`/${company.slug}/compliance/category/${section.slug}`);
    };

    const handleSectionNav = section => {
        dispatch(selectCatalogParentSection(section));
        history.push(`/${company.slug}/compliance/section/${section.slug}`);
    };

    const handleSubSectionNav = (section, slug) => {
        dispatch(selectCatalogParentSection(section));
        history.push(`/${company.slug}/compliance/section/${section.slug}?to=${slug}`);
    };

    const handleCSNaviation = () => {
        history.push(`/${company.slug}/compliance-stack`);
    }

    const handleSwitchComplOpen = event => {
        setOpenSwitchCompl(event.currentTarget);
    };

    const handleSwitchComplClose = () => {
        setOpenSwitchCompl('');
    };

    const handleRenamedDV = (document) => {

        setExtendedModelTitle(document.name);

        let index = _.findIndex(active_section_documents, doc => {
            return doc.document.id === document.id;
        });

        if (index >= 0) {
            active_section_documents[index].document = document;
            setActiveSectionDocuments(active_section_documents);
        }
    }

    const handleSectionInfoChanged = (psection, info) => {
        let parentSections = parent_sections;
        let index = _.findIndex(parentSections, sec => {
            return sec.id === psection.id;
        });
        parentSections[index].custodian_teams = info.custodian_teams;
        parentSections[index].custodians = info.custodians;
        parentSections[index].owner_teams = info.owner_teams;
        parentSections[index].owners = info.owners;
        parentSections[index].owner_thirdparty = info.owner_thirdparty;
        parentSections[index].custodian_thirdparty = info.custodian_thirdparty;
        dispatch(setParentSections(parentSections));
    }

    const handleDocumentSaved = document => {

        let index = _.findIndex(active_section_documents, doc => {
            return doc.document.id === document.id;
        });

        if (index >= 0) {
            active_section_documents[index].document = document;
            setActiveSectionDocuments(active_section_documents);
        }

    };

    const handleSectionLiked = (psection, like) => {
        let parentSections = parent_sections;
        let index = _.findIndex(parentSections, sec => {
            return sec.id === psection.id;
        });
        parentSections[index].like = like;
        dispatch(setParentSections(parentSections));
    }

    const handleActiveSectionDocs = (section_docs) => {
        setActiveSectionDocuments(section_docs);
        // update the docs in redux 
        let parentSections = parent_sections;
        let index = _.findIndex(parentSections, sec => {
            return sec.id === last_active_section_id;
        });
        if (index >= 0) {
            parentSections[index].limitted_info.documents = section_docs;
            dispatch(setParentSections(parentSections));
        }
    }

    return (
        <>
            <div className={open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum"><VisitDashboardBreadcrum /> {' > '} <span onClick={handleCSNaviation} className="_active">ComplianceStack</span> {' > '} Compliance</div>

                    <div className="cc__header">
                        <div className="__name">{standard.standard.name}</div>
                        <div className="__actions">
                            <ShareStandard standard={standard} />
                        </div>
                    </div>
                </div>

                <div className="compliance__categories">

                    {/* <StandardBanner /> */}

                    <StandardTabs />

                </div>
            </div>
        </>
    );
}



export default withRouter(ComplianceStackStandard);