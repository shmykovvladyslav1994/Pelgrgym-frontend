import type { ExerciseRulesForm } from "../../components/creating-form/schema";

export interface ProgressionRule {
    type: 'reps' | 'weight' | 'rest';
    value: number;
}

export interface IExerciseSet {
    reps: number;
    progressionRule: ProgressionRule | null;
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
}

class ExerciseSet implements IExerciseSet {
    reps: number;
    progressionRule: ProgressionRule | null;

    constructor(reps: number, progressionRule: ProgressionRule | null) {
        this.reps = reps;
        this.progressionRule = progressionRule;
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

    constructor(id: number, data: ExerciseRulesForm, createdAt: string) {
        this.id = id;
        this.name = data.name;
        this.createdAt = createdAt;
        this.trainingCycle = data.trainingCycle;
        this.sets = data.sets.map(set => new ExerciseSet(set.reps, set.progressionRule ?? null));
        this.restIntervalSec = data.restIntervalSec;
        this.incrementOrder = data.incrementOrder ?? null;
    }
}