import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ITrainingsContext } from "./interfaces/trainings-context"
import type { IExerciseSet, ITraining } from "../shared/interfaces/training"
import { api } from "../api/api"
import dayjs from "dayjs"

const TrainingsContext = createContext<ITrainingsContext>({
    trainings: [],
    loading: true,
    deleteTrainingById: () => { },
    setTrainings: () => { },
    calendar: [],
    setSelectedDate: () => { },
    selectedDate: dayjs(),
})

export function TrainingsProvider({ children }: { children: React.ReactNode }) {
    const [trainings, setTrainings] = useState<ITraining[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(dayjs())
    const [selectedMonth, setSelectedMonth] = useState(selectedDate.month())

    // проверка при старте
    useEffect(() => {
        api.get('/trainings').then(
            res => {
                setTrainings(res.map((training: ITraining) => ({
                    ...training,
                    createdAt: dayjs(training.createdAt)
                })))
            }
        ).catch(
            err => {
                console.error(err)
                setLoading(false)
            }
        ).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (selectedDate.month() !== selectedMonth) {
            setSelectedMonth(selectedDate.month())
        }
    }, [selectedDate])

    const deleteTrainingById = (id: number) => {
        api.delete(`/trainings/${id}`).then(
            () => setTrainings(prev => prev.filter(training => training.id !== id))
        )
    }

    const calculateCalendarLimits = () => {
        const startOfMonth = selectedDate.startOf('month')
        const endOfMonth = selectedDate.endOf('month')
        const start = startOfMonth.startOf('week').startOf('day')// начало недели
        const end = endOfMonth.endOf('week').startOf('day')// конец недели

        return { start, end }
    }

    const calculateIncrementsFromStart = (current: dayjs.Dayjs, createdAt: dayjs.Dayjs, trainingCycle: { workDays: number, restDays: number }, incrementIntervalPerDays: number) => {
        const daysFromStart = current.diff(createdAt.startOf('day'), 'day');
        const { workDays, restDays } =
            trainingCycle;
        const fullCycle = workDays + restDays;
        const completedCycles =
            Math.floor(daysFromStart / fullCycle);
        const remainingDays =
            daysFromStart % fullCycle;
        const workDaysFromStart =
            completedCycles * workDays +
            Math.min(remainingDays, workDays);
        return Math.floor(workDaysFromStart / incrementIntervalPerDays);
    }

    const calculateCalendar = () => {
        const days: { date: dayjs.Dayjs; isSelectedMonth: boolean, exercises: { name: string, sets: IExerciseSet[] }[] }[] = []

        const { start, end } = calculateCalendarLimits()
        let current = start;
        const calendarDays = end.diff(start, 'day') + 1;

        for (let i = 1; i <= calendarDays; i++) {
            const exercises = trainings.reduce((
                acc,
                { createdAt, name, sets, trainingCycle, incrementOrder, incrementValue, incrementIntervalPerDays }
            ) => {
                if (createdAt.isSame(current, 'day')) {
                    acc.push({
                        name: name,
                        sets: sets,
                    });
                }

                if (createdAt.isBefore(current, 'day')) {
                    const incrementsFromStart = calculateIncrementsFromStart(current, createdAt, trainingCycle, incrementIntervalPerDays)

                    const lastIndex = sets.length - 1;
                    let currentIncrementIndex = incrementOrder === 'Asc' ? 0 : lastIndex;
                    let newSets = sets.map(set => ({ ...set }));

                    for (let i = 1; i <= incrementsFromStart; i++) {
                        const setToIncrement = newSets.at(currentIncrementIndex)
                        setToIncrement && (setToIncrement.reps += incrementValue);

                        switch (incrementOrder) {
                            case 'Asc':
                                currentIncrementIndex++;
                                currentIncrementIndex = currentIncrementIndex > lastIndex ? 0 : currentIncrementIndex;
                                break;
                            case 'Desc':
                                currentIncrementIndex--;
                                currentIncrementIndex = currentIncrementIndex < 0 ? lastIndex : currentIncrementIndex;
                                break;
                        }

                    }

                    acc.push({
                        name: name,
                        sets: newSets,
                    })
                }

                return acc;
            }, [] as { name: string, sets: IExerciseSet[] }[])



            days.push({
                date: current,
                isSelectedMonth: current.month() === selectedMonth,
                exercises,
            })

            current = current.add(1, 'day')
        }

        return days
    };

    const calendar = useMemo(() => calculateCalendar(), [trainings, selectedMonth])

    return (
        <TrainingsContext.Provider value={{ trainings, loading, deleteTrainingById, setTrainings, calendar, setSelectedDate, selectedDate }}>
            {children}
        </TrainingsContext.Provider>
    )
}

export const useTrainings = () => useContext(TrainingsContext)