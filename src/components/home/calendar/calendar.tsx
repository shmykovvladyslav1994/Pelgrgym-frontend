import dayjs from "dayjs"
import { useMemo } from "react"
import { useTrainings } from "../../../context/trainings-context"

function Calendar() {

    const { trainings } = useTrainings()

    const calendar = useMemo(() => {
        console.log('calculating calendar')
        const selectedDate = dayjs()// текущая дата
        const startOfMonth = selectedDate.startOf('month')
        const endOfMonth = selectedDate.endOf('month')
        const start = startOfMonth.startOf('week')// начало недели
        const end = endOfMonth.endOf('week')// конец недели
        const days: { date: dayjs.Dayjs; isSelectedMonth: boolean, }[] = []
        let current = start

        while (current.isBefore(end) || current.isSame(end, 'day')) {
            days.push({
                date: current,
                isSelectedMonth: current.month() === selectedDate.month()
            })

            current = current.add(1, 'day')
        }

        return days
    }, []);





    return (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {calendar.map((day, i) => (
                <div key={i} className={day.isSelectedMonth ? 'day' : 'day dim'}>
                    {day.date.date()}
                </div>
            ))}
        </div>
    )
}

export default Calendar