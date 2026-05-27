import { z } from 'zod'

export const progressionRuleSchema = z.object({
    type: z.enum([
        'reps',
        'weight',
        'rest'
    ]),
    value: z.number().min(0)
})

export const exerciseSetSchema = z.object({
    reps: z.number().min(1),
    progressionRule: progressionRuleSchema.optional()
})

export const trainingCycleSchema = z.object({
    workDays: z.number().min(1),
    restDays: z.number().min(0)
})

export const exerciseRulesSchema = z.object({
    name: z.string()
        .min(1, 'set name'),

    restIntervalSec: z.number()
        .min(0),

    trainingCycle: trainingCycleSchema,

    sets: z.array(
        exerciseSetSchema
    ).min(1),
    incrementOrder: z.enum(['asc', 'desc']).optional()
})

export type ExerciseRulesForm =
    z.infer<typeof exerciseRulesSchema>
