import { useTrainings } from "../../../context/trainings-context";


function DayExercises() {

    const { calendar, selectedDate } = useTrainings()
    const dayTasks = calendar.find(day => day.date.isSame(selectedDate, 'day'))?.exercises


    return (
        <>
            <h1>Day Exercises</h1>
            {dayTasks && dayTasks.map(({ name, sets }) => {
                return (<div key={name}>
                    <div>{name}</div>
                    <div>
                        {sets.map((set, i) => (<div key={i}>{set.reps}</div>))}
                    </div>
                </div>)
            })}
        </>
    );
}

export default DayExercises;