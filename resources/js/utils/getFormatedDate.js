import moment from "moment-timezone";

export default date => {
    return moment.tz(date, moment.tz.guess()).format("YYYY-MM-DD hh:mm:ss");
};
