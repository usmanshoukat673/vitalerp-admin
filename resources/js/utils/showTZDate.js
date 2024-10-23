import moment from 'moment-timezone';

export default (date, timezone) => {
    return (timezone != null ? moment.tz(date, timezone).format("YYYY-MM-DD hh:mm A zz") : moment.tz(date, moment.tz.guess()).format("YYYY-MM-DD hh:mm A"));
}
