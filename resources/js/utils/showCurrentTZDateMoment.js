import React from 'react';
import moment from "moment-timezone";
import Moment from 'react-moment';

const ShowCurrentTZDateMoment = ({date}) => {
    return (<Moment fromNow>{moment.tz(date, moment.tz.guess()).format("YYYY-MM-DD hh:mm:ss")}</Moment>);
}

export default ShowCurrentTZDateMoment;
