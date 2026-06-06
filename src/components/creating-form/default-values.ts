import { type ExerciseRulesForm } from './schema'

export const defaultValues: ExerciseRulesForm = {
    name: '',
    restIntervalSec: 60,
    trainingCycle: {
        workDays: 5,
        restDays: 2
    },
    sets: [{ reps: 10 }],
    incrementOrder: 'Asc',
    incrementIntervalPerDays: 1,
    incrementValue: 1,
}