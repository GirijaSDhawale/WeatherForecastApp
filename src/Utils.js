const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 'Friday', "Saturday"
]

const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

export function formatWeekDay(date) {
  let weekDay = date.getDay()
  return days[weekDay]
}

export function formatMonth(date) {
  let month = date.getMonth()
  return months[month]
}