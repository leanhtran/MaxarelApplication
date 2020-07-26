export const getDateByDay = (index) => {
    const miniSecondOneDay = 86400000
    const moment = new Date()
    const miniSecondMoment = Date.parse(moment)
    const day = moment.getDay()
    let date = 0

    if(day !== 0) {
        if(index > day) {
            date = (index - day) * miniSecondOneDay + miniSecondMoment
            const currentDay = new Date(date)
            const currentDate = currentDay.getDate()
            const month = currentDay.getMonth() + 1
            const year = currentDay.getFullYear()
            let fullDay = month + '/' + currentDate + '/' + year
            return fullDay
        }
        else if(index < day) {
            date = (miniSecondMoment - (day - index) * miniSecondOneDay) + 7 * miniSecondOneDay
            const currentDay = new Date(date)
            const currentDate = currentDay.getDate()
            const month = currentDay.getMonth() + 1
            const year = currentDay.getFullYear()
            const fullDay = month + '/' + currentDate + '/' + year
            return fullDay
        }
        else {
            date = moment.getDate()
            const month = moment.getMonth() + 1
            const year = moment.getFullYear()
            const fullDay = month + '/' + date + '/' + year
            return fullDay
        }
    }
    else {
    if(index === 0) {
        date = moment.getDate()
        const month = moment.getMonth() + 1
        const year = moment.getFullYear()
        const fullDay = month + '/' + date + '/' + year
        return fullDay
    }
    else {
        date = (index - day) * miniSecondOneDay + miniSecondMoment
        const currentDay = new Date(date)
        const currentDate = currentDay.getDate()
        const month = currentDay.getMonth() + 1
        const year = currentDay.getFullYear()
        const fullDay = month + '/' + currentDate + '/' + year
        return fullDay
    }
    }
}