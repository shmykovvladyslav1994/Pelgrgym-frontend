import type { ITraining } from "../../shared/interfaces/training"

export interface ITrainingsContext {
    trainings: ITraining[]
    loading: boolean,
    deleteTrainingById: (id: number) => void,
    setTrainings: (updateFn: (prev: ITraining[]) => ITraining[]) => void
}
