import type { ExerciseRulesForm } from "../../components/creating-form/schema";

export interface ProgressionRule {
    type: 'reps' | 'weight' | 'rest';
    value: number;
}

export interface IExerciseSet {
    reps: number;
}

export interface ITraining {
    id: number;
    name: string;
    createdAt: string;

    trainingCycle: {
        workDays: number;
        restDays: number;
    };
    sets: IExerciseSet[];
    restIntervalSec: number;

    incrementOrder: 'asc' | 'desc' | null;
    incrementIntervalPerDays: number;
    incrementValue: number;
}

class ExerciseSet implements IExerciseSet {
    reps: number;

    constructor(reps: number) {
        this.reps = reps;
    }
}

export class Training implements ITraining {
    id: number;
    name: string;
    createdAt: string;

    trainingCycle: {
        workDays: number;
        restDays: number;
    };
    sets: IExerciseSet[];
    restIntervalSec: number;

    incrementOrder: 'asc' | 'desc' | null;
    incrementIntervalPerDays: number;
    incrementValue: number;

    constructor(id: number, data: ExerciseRulesForm, createdAt: string) {
        this.id = id;
        this.name = data.name;
        this.createdAt = createdAt;
        this.trainingCycle = data.trainingCycle;
        this.sets = data.sets.map(set => new ExerciseSet(set.reps));
        this.restIntervalSec = data.restIntervalSec;
        this.incrementOrder = data.incrementOrder ?? null;
        this.incrementIntervalPerDays = data.incrementIntervalPerDays ?? 0;
        this.incrementValue = data.incrementValue ?? 0;
    }
}