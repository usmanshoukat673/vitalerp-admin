import React, { Component } from 'react';
import './LeftSlideMenu.scss';
import { openSubLeftNave, closeSubLeftNav, setParentSections, selectCatalogSection } from '../../../actions';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { animateScroll as scroll } from 'react-scroll';

class LeftSlideMenu extends Component {

    handleClick = _section => {
        const { leftnav } = this.props;

        const { parent_sections } = leftnav;

        let ps_index = _.findIndex(parent_sections, ps => {
            return ps.id === _section.id;
        });
        _section.selected = !_section.selected;
        parent_sections[ps_index] = _section;

        this.props.setParentSections(parent_sections);
    }

    handleClose = () => {
        this.props.closeSubLeftNav();
        // this.props.selectCatalogSection({}); // tneeds to think
    };

    handleNavigation = section => {
        const { leftnav, company } = this.props;

        this.props.selectCatalogSection(section);
        scroll.scrollToTop();
        this.props.history.push(`/${company.slug}/compliance1/${section.slug}`);
    };

    render() {

        const { leftnav, company } = this.props;

        const { section, parent_sections } = leftnav;

        return (
            <React.Fragment>

                {leftnav.open_sub ?
                    <div className="slide__sub__left__menu">
                        {/**
                            leftnav.sub_menu_x_btn ? <div className="menu__close__box">
                                <IconButton onClick={this.handleClose} className="close__button"> <VscChromeClose /> </IconButton>
                            </div> : ''*/}

                        <div className="sub__left__settings_box">

                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                style={{ width: '100%', maxWidth: 360, paddingTop: '0px' }}
                            >

                                {
                                    _.map(parent_sections, _section => {
                                        return (
                                            <React.Fragment key={_section.id}>
                                                <ListItem button onClick={() => { this.handleClick(_section) }} style={{ paddingLeft: '2px', paddingRight: '4px', paddingbottom: '4px', paddingTop: '4px' }}>
                                                    <ListItemText>
                                                        <span style={{ fontWeight: 600 }}>{_section.menu_name}</span>
                                                    </ListItemText>
                                                    {_section.selected ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </ListItem>
                                                <Collapse in={_section.selected} timeout="auto" unmountOnExit>
                                                    {/** <List component="div" disablePadding>
                                                        <ListItem button style={{ paddingLeft: '32px' }}>
                                                            <ListItemIcon>
                                                                <StarBorder />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Starred" />
                                                        </ListItem>
                                                    </List> */}


                                                    {_.map(_section.sections, _csection => {
                                                        return (
                                                            <a className={section.id === _csection.id ? 'active' : ''} key={_csection.id} onClick={() => { this.handleNavigation(_csection) }} >{_csection.menu_name}</a>
                                                        )
                                                    })}
                                                </Collapse>
                                            </React.Fragment>
                                        )
                                    })
                                }

                            </List>

                            {/**
                                _.map(psections, _section => {
                                    return (
                                        <div key={_section.psection_id}>
                                            <div>
                                                {_section.menu_name}
                                            </div>

                                            {_.map(_section.sections, _csection => {
                                                return (<a className={section.section_id === _csection.section_id ? 'active' : ''} key={_csection.section_id} onClick={() => { this.handleNavigation(_csection) }} >{_csection.menu_name}</a>)
                                            })}
                                        </div>
                                    )
                                })
                             */}
                        </div>
                    </div>
                    : ''}
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { openSubLeftNave, closeSubLeftNav, setParentSections, selectCatalogSection })(LeftSlideMenu));
