import moment from 'moment';

export default (date) => {
    return (date == null ? '' : moment(date).format("YYYY-MM-DD"));
}
