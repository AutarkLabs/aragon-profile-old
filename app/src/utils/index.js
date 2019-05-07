import moment from 'moment'

export const toUnix = date => moment(date).unix()

export const unixToCalendar = unix => moment.unix(unix).format('YYYY-MM-DD')

export const todayInUnix = () => Number(moment().format('X'))
