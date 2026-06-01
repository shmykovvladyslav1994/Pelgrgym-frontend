import { type ExerciseRulesForm } from './schema'

export const defaultValues: ExerciseRulesForm = {
    name: '',
    restIntervalSec: 60,
    trainingCycle: {
        workDays: 5,
        restDays: 2
    },
    sets: [{ reps: 10, progressionRule: { type: 'reps', value: 1 } }],
    incrementOrder: 'asc',
    incrementIntervalPerDays: 1,
    incrementValue: 1,
}