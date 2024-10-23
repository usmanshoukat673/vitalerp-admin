import React, { Component } from 'react';
import _ from 'lodash';
import './FileManager.scss';
import { VscFileSubmodule } from "react-icons/vsc";
import { NavLink } from 'react-router-dom';

class FileExplorer extends Component {

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { company, documents } = this.props;

        return (
            <div className="sub__left__menu">
                <div className="sub__settings_box">
                    <div className="heading"><VscFileSubmodule /> Files</div>
                    <NavLink activeClassName="active" to={`/${company.slug}/files/${company.document.enc_id}`} >All Files</NavLink>

                    {
                        _.map(documents, doc => {
                            return (doc.type === 'folder' ? <NavLink key={doc.enc_id} activeClassName="active" to={`/${company.slug}/files/${doc.enc_id}`} >{doc.name}</NavLink> : '');
                        })
                    }
                </div>
            </div>
        );
    }
}

export default FileExplorer;
