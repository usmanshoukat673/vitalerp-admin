// @flow
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

import { findAllParent, findMenuItem } from '../helpers/menu';

import { selectStandard, setParentSections, setCompanyUsers } from '../actions';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api/api';

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu, company, token, navigate }) => {
    const [open, setOpen] = useState(activeMenuItems.includes(item.id));

    const history = useHistory();
    const location = useLocation();
    // The Menu auto hide issue fix
    // useEffect(() => {
    //     setOpen(activeMenuItems.includes(item.id));
    // }, [activeMenuItems, item]);

    const toggleMenuItem = (e) => {
        e.preventDefault();
        let status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);

        if (item.id == 'apps-compliance-stack') {
            if (location.pathname != item.url) {
                // not on stack page then be on stack and expand the menu
                setOpen(true);
                toggleMenu(item, true);
                // move to stack page
                history.push(item.url);
            }
        }

        return false;
    };

    return (
        <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
            <Link
                to="/#"
                onClick={toggleMenuItem}
                data-menu-key={item.id}
                aria-expanded={open}
                className={classNames('has-arrow', 'side-sub-nav-link', linkClassName, {
                    'menuitem-active': activeMenuItems.includes(item.id) ? 'active' : '',
                })}>
                <i className="uil-notebooks"></i>
                {!item.badge ? (
                    <span className="menu-arrow"></span>
                ) : (
                    <span
                        className={classNames('badge', 'bg-' + item.badge.variant, 'float-end', {
                            'text-dark': item.badge.variant === 'light',
                        })}>
                        {item.badge.text}
                    </span>
                )}
                <span> {item.label} </span>
            </Link>
            <Collapse in={open}>
                <ul className={classNames(subMenuClassNames)}>
                    {item.children.map((child, i) => {
                        return (
                            <React.Fragment key={i}>
                                {child.children ? (
                                    <>
                                        {/* parent */}
                                        <MenuItemWithChildren
                                            item={child}
                                            linkClassName={activeMenuItems.includes(child.id) ? 'active' : ''}
                                            activeMenuItems={activeMenuItems}
                                            subMenuClassNames="side-nav-third-level"
                                            toggleMenu={toggleMenu}
                                            company={company} token={token} navigate={navigate}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* child */}
                                        <MenuItem
                                            item={child}
                                            className={activeMenuItems.includes(child.id) ? 'menuitem-active' : ''}
                                            linkClassName={activeMenuItems.includes(child.id) ? 'active' : ''}
                                            company={company} token={token} navigate={navigate}
                                        />
                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ul>
            </Collapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName, navigate }) => {
    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink item={item} className={linkClassName} navigate={navigate} />
        </li>
    );
};



const MenuItemLink = ({ item, className, navigate }) => {

    const navigateStandard = () => {

        axiosInstance.post(`/api/user/compliance/parent-sections`, {
            standards: [item.std.standard_id],
        })
            .then(e => {
                navigate(item.url, item.std, e.data.parent_sections, e.data.users);
            })
            .catch(err => { });
    }

    return ((item.parentKey && item.parentKey === 'apps-compliance-stack') ? (
        <a
            onClick={navigateStandard}
            target={item.target}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className, 'chand')}
            data-menu-key={item.id}>
            <i className="uil-notebooks"></i>
            {item.badge && (
                <span
                    className={classNames('badge', 'bg-' + item.badge.variant, 'rounded-pill', 'font-10', 'float-end', {
                        'text-dark': item.badge.variant === 'light',
                    })}>
                    {item.badge.text}
                </span>
            )}
            <span> {item.menu_name} </span>
        </a>
    ) : (
        <Link
            to={{ pathname: item.url }}
            target={item.target}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className)}
            data-menu-key={item.id}>
            <i className="uil-notebooks"></i>
            {item.badge && (
                <span
                    className={classNames('badge', 'bg-' + item.badge.variant, 'rounded-pill', 'font-10', 'float-end', {
                        'text-dark': item.badge.variant === 'light',
                    })}>
                    {item.badge.text}
                </span>
            )}
            <span> {item.menu_name} </span>
        </Link>
    ));
};


const PolicyPanelMenu = ({ menuItems, company, token, history }) => {

    let location = useLocation();

    let dispatch = useDispatch();

    const menuRef = useRef(null);

    const [activeMenuItems, setActiveMenuItems] = useState([]);

    /*
     * toggle the menus
     */
    const toggleMenu = (menuItem, show) => {
        if (show) setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)]);
    };

    /**
     * activate the menuitems
     */
    const activeMenu = useCallback(() => {
        const div = document.getElementById('main-side-menu');
        let matchingMenuItem = null;

        if (div) {
            let items = div.getElementsByClassName('side-nav-link-ref');
            for (let i = 0; i < items.length; ++i) {
                if (location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }

            if (matchingMenuItem) {
                const mid = matchingMenuItem.getAttribute('data-menu-key');
                const activeMt = findMenuItem(menuItems, mid);
                if (activeMt) {
                    setActiveMenuItems([activeMt['key'], ...findAllParent(menuItems, activeMt)]);
                }
            }
        }
    }, [location.pathname, menuItems]);

    const handleNavigate = (url, std, parent_sections, users) => {
        dispatch(selectStandard(std));
        dispatch(setParentSections(parent_sections));
        dispatch(setCompanyUsers(users));
        history.push(url);
    }

    useEffect(() => {
        activeMenu();
    }, []);

    return (
        <>
            <ul className="side-nav" ref={menuRef} id="main-side-menu">
                {/* {([]).map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {item.isTitle ? (
                                <li className="side-nav-title side-nav-item">{item.menu_name}</li>
                            ) : (
                                <>
                                    {item.children ? (
                                        <MenuItemWithChildren
                                            item={item}
                                            toggleMenu={toggleMenu}
                                            subMenuClassNames="side-nav-second-level"
                                            activeMenuItems={activeMenuItems}
                                            linkClassName="side-nav-link"
                                            company={company} token={token}
                                            navigate={handleNavigate}
                                        />
                                    ) : (
                                        <MenuItem
                                            item={item}
                                            linkClassName="side-nav-link"
                                            className={activeMenuItems.includes(item.id) ? 'menuitem-active' : ''}
                                            company={company} token={token} navigate={handleNavigate}
                                        />
                                    )}
                                </>
                            )}
                        </React.Fragment>
                    );
                })} */}
            </ul>
        </>
    );
};

export default withRouter(PolicyPanelMenu);
