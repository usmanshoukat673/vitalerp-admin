import React, { useEffect, useState } from "react";
import FilterType from "./FilterType";
import { useDispatch, useSelector } from "react-redux";
import { setStandardFamilies, setStandardFocuses, setStandardStatutes, setStandardTypes, setStandardVersions } from "../../../actions";
import Stack from '@mui/material/Stack';
import SelectedItem from "./SelectedItem";

const StoreFilterBox = ({ store_type }) => {

    const { std_families, std_versions, std_focuses, std_statutes, std_types } = useSelector((state) => ({
        std_types: state.marketplace.std_types,
        std_families: state.marketplace.std_families,
        std_versions: state.marketplace.std_versions,
        std_focuses: state.marketplace.std_focuses,
        std_statutes: state.marketplace.std_statutes,
    }));

    const dispatch = useDispatch();

    useEffect(() => {

    }, [store_type]);

    const handleSelected = (e) => {
        if (e.type == 'types') {
            dispatch(setStandardTypes(_.map(std_types, tp => {
                if (e.id == tp.id) {
                    tp.checked = e.checked;
                }
                return tp;
            })));
        }
        else if (e.type == 'families') {
            dispatch(setStandardFamilies(_.map(std_families, fm => {
                if (e.id == fm.id) {
                    fm.checked = e.checked;
                }
                return fm;
            })));
        }
        else if (e.type == 'versions') {
            dispatch(setStandardVersions(_.map(std_versions, vr => {
                if (e.id == vr.id) {
                    vr.checked = e.checked;
                }
                return vr;
            })));
        }
        else if (e.type == 'focuses') {
            dispatch(setStandardFocuses(_.map(std_focuses, fs => {
                if (e.id == fs.id) {
                    fs.checked = e.checked;
                }
                return fs;
            })));
        }
        else if (e.type == 'statutes') {
            dispatch(setStandardStatutes(_.map(std_statutes, sta => {
                if (e.id == sta.id) {
                    sta.checked = e.checked;
                }
                return sta;
            })));
        }
    }

    const clearAll = () => {
        dispatch(setStandardTypes(_.map(std_types, tp => {
            tp.checked = false;
            return tp;
        })));
        dispatch(setStandardFamilies(_.map(std_families, fm => {
            fm.checked = false;
            return fm;
        })));
        dispatch(setStandardVersions(_.map(std_versions, vr => {
            vr.checked = false;
            return vr;
        })));
        dispatch(setStandardFocuses(_.map(std_focuses, fs => {
            fs.checked = false;
            return fs;
        })));
        dispatch(setStandardStatutes(_.map(std_statutes, sta => {
            sta.checked = false;
            return sta;
        })));
    }

    return (
        <div className="leftanav__filters__container">
            <div className="__options__box">
                <div className="filter__results__wrapper">
                    <div className="filtered__results">
                        <div className="__title__block">
                            <div className="__title">
                                Filter Results
                            </div>
                            <button onClick={clearAll} tabIndex="0" className="clear-all">Clear All</button>
                        </div>
                        <div className="__selected__items__wrapper">
                            {
                                _.map(std_types, tp => (
                                    <SelectedItem handleDelete={handleSelected} type="types" key={`${tp.name}`} item={tp} />
                                ))
                            }
                            {
                                 _.map(std_families, ft => (
                                    <SelectedItem handleDelete={handleSelected} type="families" key={`${ft.name}`} item={ft} />
                                ))
                            }
                            {
                                 _.map(std_versions, ft => (
                                    <SelectedItem handleDelete={handleSelected} type="versions" key={`${ft.name}`} item={ft} />
                                ))
                            }
                             {
                                 _.map(std_focuses, ft => (
                                    <SelectedItem handleDelete={handleSelected} type="focuses" key={`${ft.name}`} item={ft} />
                                ))
                            }
                             {
                                 _.map(std_statutes, ft => (
                                    <SelectedItem handleDelete={handleSelected} type="statutes" key={`${ft.name}`} item={ft} />
                                ))
                            }
                        </div>
                    </div>

                    {/* <div className="message-bar">
                        <div className="anav_message-bar_content">
                            Selecting filter(s) will refresh the results and may change the availability of other options.
                        </div>
                    </div> */}

                </div>

                <FilterType
                    title="Type"
                    type="types"
                    items={std_types}
                    selected={handleSelected}
                />

                <FilterType
                    title="Family"
                    type="families"
                    items={std_families}
                    selected={handleSelected}
                />

                <FilterType
                    title="Version"
                    type="versions"
                    items={std_versions}
                    selected={handleSelected}
                />

                <FilterType
                    title="Focus"
                    type="focuses"
                    items={std_focuses}
                    selected={handleSelected}
                />

                <FilterType
                    title="Statutes"
                    type="statutes"
                    items={std_statutes}
                    selected={handleSelected}
                />
            </div>

        </div>
    );
}

export default StoreFilterBox;