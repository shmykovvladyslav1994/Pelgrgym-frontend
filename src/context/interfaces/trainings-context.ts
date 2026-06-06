import type dayjs from "dayjs";
import type { IExerciseSet, ITraining } from "../../shared/interfaces/training"

export interface ITrainingsContext {
    trainings: ITraining[]
    loading: boolean,
    deleteTrainingById: (id: number) => void,
    setTrainings: (updateFn: (prev: ITraining[]) => ITraining[]) => void,
    calendar: { date: dayjs.Dayjs; isSelectedMonth: boolean, exercises: { name: string, sets: IExerciseSet[] }[] }[],
    setSelectedDate: (date: dayjs.Dayjs) => void,
    selectedDate: dayjs.Dayjs,
}
