import { useTrainings } from "../../../context/trainings-context"

function Calendar() {

    const { calendar, setSelectedDate } = useTrainings()

    return (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {calendar.map((day, i) => (
                <div onClick={() => setSelectedDate(day.date)} key={i} className={day.isSelectedMonth ? 'day' : 'day dim'}>
                    {day.date.date()}
                </div>
            ))}
        </div>
    )
}

export default Calendar