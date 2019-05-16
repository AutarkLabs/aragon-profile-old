import moment from 'moment'
import uuidv1 from 'uuid/v1'

/* TIME HELPERS */
export const toUnix = date => moment(date, 'YYYY-MM-DD').unix()

export const unixToCalendar = unix => moment.unix(unix).format('YYYY-MM-DD')
export const yearFromUnix = unix => moment.unix(unix).format('YYYY')
export const monthFromUnix = unix => moment.unix(unix).format('MM')
export const unixToWorkDate = unix => moment.unix(unix).format('MMM YYYY')
export const unixToEducationDate = unix => moment.unix(unix).format('YYYY')

export const todayInUnix = () => Number(moment().format('X'))

/* FORM HELPERS */

const assignArbitraryIds = fieldArray => {
  const returnObj = {}
  fieldArray.forEach(field => (returnObj[uuidv1()] = field))
  return returnObj
}

export const reformatNestedFields = forms => {
  const copiedForms = { ...forms }
  if (copiedForms.educationHistory) {
    copiedForms.educationHistory = assignArbitraryIds(
      copiedForms.educationHistory
    )
  }

  if (copiedForms.workHistory) {
    copiedForms.workHistory = assignArbitraryIds(copiedForms.workHistory)
  }
  return copiedForms
}

export const months = [
  'Month',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const currentYear = yearFromUnix(todayInUnix())
export const years = Array.apply(0, Array(74)).map((_x, index) =>
  index === 0 ? 'Year' : (currentYear - index).toString()
)
