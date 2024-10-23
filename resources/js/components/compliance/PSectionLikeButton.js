import React, { Component } from 'react';
import { BsBookmarkCheckFill, BsBookmarkDashFill } from "react-icons/bs";
import { Popup } from 'semantic-ui-react';
import Button from '@mui/material/Button';
import './PSectionLikeButton.scss';
import axiosInstance from '../../api/api';


class PSectionLikeButton extends Component {

    state = {
        errors: [],
        loading: false,
    }

    handleLike = action => {

        const { standard, psection, parent } = this.props;

        this.setState({ errors: [], loading: true });

        axiosInstance.post(`/api/user/compliance/likes/toggle-psection-like`, {
            standard_id: standard.id,
            psection: psection,
            like: action,
            parent: parent,

        })
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                });

                this.props.liked(e.data.like);

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    render() {

        const { psection, like } = this.props;

        return (<div className="section__like__button">
            {
                like && like.liked === 1 ? <Popup
                    content={`Press this button to unfollow the section.`}
                    header={`Unfollow`}
                    trigger={
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => this.handleLike(0)}
                            startIcon={<BsBookmarkDashFill className="__the__thumb" />} >
                            Following
                        </Button>
                    }
                /> :

                    <Popup
                        content={`Press this button to follow ${psection.menu_name}.`}
                        header={`Follow`}
                        trigger={<Button
                            onClick={() => this.handleLike(1)}
                            variant="outlined"
                            size="small"
                            color="primary"
                            startIcon={<BsBookmarkCheckFill className="__the__thumb" />} >
                            Follow
                        </Button>}
                    />
            }

        </div>);
    }
}

export default PSectionLikeButton;
