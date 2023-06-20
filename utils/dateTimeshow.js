import moment from "moment"

export const dateTimeShow = (date) => {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY') === moment().format('DD/MM/YYYY') ? 'Today' : moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY') === moment().subtract(1, 'days').format('DD/MM/YYYY') ? 'Yesterday' : moment(date, 'DD/MM/YYYY').isSame(moment(), 'week') ? moment(date, 'DD/MM/YYYY').format('dddd') : moment(date, 'DD/MM/YYYY').format('YYYY') === moment().format('YYYY') ? moment(date, 'DD/MM/YYYY').format('ddd, MMM YY') : moment(date, 'DD/MM/YYYY').format('MMM DD, YYYY')
}