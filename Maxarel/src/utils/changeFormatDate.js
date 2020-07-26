export const changeFormatDate = (data) => {
  let fullDay = ''
  const date = data.slice(0,2)
  const month = data.slice(3,5)
  const year = data.slice(6,10)
  const time = data.slice(10)
  fullDay = year + '/' + month + '/' + date + time
  return fullDay
}