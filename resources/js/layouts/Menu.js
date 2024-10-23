// @flow
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

import { findAllParent, findMenuItem } from '../helpers/menu';

import { selectStandard, setParentSections, setCompanyUsers, selectLanAssets, selectLanCategory, selectLanDetailsPanelType, closeSubLeftNav, toggleTreeViewArea, changeSidebarType, changePageAreaState } from '../actions';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/api';
import { SECTION_AGENTS } from '../constants/layout';

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu, company, token, navigate }) => {
    const [open, setOpen] = useState(activeMenuItems.includes(item.key));

    const history = useHistory();
    const location = useLocation();
    // The Menu auto hide issue fix
    // useEffect(() => {
    //     setOpen(activeMenuItems.includes(item.key));
    // }, [activeMenuItems, item]);

    const toggleMenuItem = (e) => {
        e.preventDefault();
        let status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);

        if (item.key == 'apps-compliance-stack') {
            if (location.pathname != item.url) {
                // not on stack page then be on stack and expand the menu
                setOpen(true);
                toggleMenu(item, true);
                // move to stack page
                history.push(item.url);
            }
        }
        else if (item.key == 'apps-projects') {
            if (location.pathname != item.url) {
                setOpen(true);
                toggleMenu(item, true);
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
                data-menu-key={item.key}
                aria-expanded={open}
                className={classNames('has-arrow', 'side-sub-nav-link', linkClassName, {
                    'menuitem-active': activeMenuItems.includes(item.key) ? 'active' : '',
                })}>
                {item.icon && <i className={item.icon}></i>}
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
                                            linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
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
                                            className={activeMenuItems.includes(child.key) ? 'menuitem-active' : ''}
                                            linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
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

const MenuItem = ({ item, className, linkClassName, navigate, navigate_to_asset, toggleMenu }) => {

    // const location = useLocation();

    // useEffect(() => {
    //     if () {
    //         toggleMenu(item, true);
    //     }
    // }, [location]);

    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink item={item} className={linkClassName} navigate={navigate} toggleMenu={toggleMenu} navigate_to_asset={navigate_to_asset} />
        </li>
    );
};



const MenuItemLink = ({ item, className, navigate, navigate_to_asset, toggleMenu }) => {

    const history = useHistory();
    const location = useLocation();

    const navigateStandard = () => {

        axiosInstance.post(`/api/user/compliance/parent-sections`, {
            standards: [item.std.standard_id],
        })
            .then(e => {
                navigate(item.url, item.std, e.data.parent_sections, e.data.users);
            })
            .catch(err => { });
    }

    const toogleMenu = (e) => {
        e.preventDefault();
        if (toggleMenu) toggleMenu(item, true);

        if (location.pathname != item.url) {
            // not on stack page then be on stack and expand the menu
            toggleMenu(item, true);
            // move to stack page
            history.push(item.url);
        }
    }

    return ((item.parentKey && item.parentKey === 'apps-compliance-stack') ? (
        <a
            onClick={navigateStandard}
            target={item.url}
            pathname={item.url}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className, 'chand')}
            data-menu-key={item.key}>
            <MenuMeta item={item} />
        </a>
    ) : (item.key && item.key === 'app-agents') ? <a
        onClick={() => navigate_to_asset(item)}
        target={item.url}
        pathname={item.url}
        className={classNames('side-nav-link-ref', 'side-sub-nav-link', className, 'chand')}
        data-menu-key={item.key}>
        <MenuMeta item={item} />
    </a> : (
        <a
            onClick={toogleMenu}
            target={item.url}
            pathname={item.url}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className, 'chand')}
            data-menu-key={item.key}>
            <MenuMeta item={item} />
        </a>
    ));
};

const MenuMeta = ({ item }) => {
    return (
        <>
            {item.icon && <i className={item.icon}></i>}
            {item.badge && (
                <span
                    className={classNames('badge', 'bg-' + item.badge.variant, 'rounded-pill', 'font-10', 'float-end', {
                        'text-dark': item.badge.variant === 'light',
                    })}>
                    {item.badge.text}
                </span>
            )}
            <span> {item.label} </span>
        </>
    )
}

/**
 * Renders the application menu
 */

// type AppMenuProps = {
//     menuItems: Array<any>,
// };

const AppMenu = ({ menuItems, company, token, history }) => {
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
                if (location.pathname === items[i].getAttribute('pathname')) {
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

    const navigateToAsset = (item) => {
        axiosInstance.get(`/api/user/assets/list/${item.category.id}`)
        .then(e => {
            dispatch(selectLanAssets(e.data.lan_assets));
            dispatch(selectLanCategory(item.category));
            dispatch(selectLanDetailsPanelType('category'));
            dispatch(closeSubLeftNav());
            dispatch(toggleTreeViewArea({
                open: true,
                type: SECTION_AGENTS,
                route: SECTION_AGENTS
            }));
            dispatch(changeSidebarType('condensed'));
            dispatch(changePageAreaState('focused'));
            history.push(`/${SECTION_AGENTS}/${item.category.slug}`);
        });
    }

    useEffect(() => {
        activeMenu();
    }, []);

    return (
        <>
            <div className="pt-5">
                <ul className="side-nav" ref={menuRef} id="main-side-menu">
                    {(menuItems || []).map((item, idx) => {
                        return (
                            item.showMenu && <React.Fragment key={idx}>
                                {item.isTitle ? (
                                    <li className="side-nav-title side-nav-item">{item.label}</li>
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
                                                toggleMenu={toggleMenu}
                                                linkClassName="side-nav-link"
                                                className={location.pathname.includes(item.urlKey) ? 'menuitem-active' : ''}
                                                company={company} token={token} 
                                                navigate={handleNavigate}
                                                navigate_to_asset={navigateToAsset}
                                            />
                                        )}
                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default withRouter(AppMenu);
