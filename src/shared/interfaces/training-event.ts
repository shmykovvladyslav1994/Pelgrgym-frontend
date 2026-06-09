export interface ITrainingEvent {
    id: number;
    date: string;
    result: trainingEventResult;
    trainingId: number;
}

export type trainingEventResult = 'Easy'