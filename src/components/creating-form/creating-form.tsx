import {
    useForm,
    useFieldArray
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    exerciseRulesSchema,
    type ExerciseRulesForm
} from './schema'
import { defaultValues } from './default-values'
import { api } from '../../api/api'
import { useTrainings } from '../../context/trainings-context'
import type { ITraining } from '../../shared/interfaces/training'

function CreatingForm() {
    const { setTrainings } = useTrainings()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<ExerciseRulesForm>({
        resolver: zodResolver(
            exerciseRulesSchema
        ),

        defaultValues
    })

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: 'sets'
    })

    const onSubmit = (
        data: ExerciseRulesForm
    ) => {
        api.post('/trainings', data).then(
            () => {
                setTrainings((prev: ITraining[]) => [...prev, data as unknown as ITraining])
            }
        ).catch(
            err => {
                console.error(err)
            }
        )
    }

    return <form onSubmit={handleSubmit(onSubmit)}>

        <input
            placeholder="name"
            {...register('name')}
        />

        {errors.name && (
            <p>{errors.name.message}</p>
        )}

        <input
            type="number"
            placeholder="rest interval sec"

            {...register(
                'restIntervalSec',
                {
                    valueAsNumber: true
                }
            )}
        />

        <input
            type="number"
            {...register('trainingCycle.workDays', {
                valueAsNumber: true
            })}
        />

        <input
            type="number"
            {...register('trainingCycle.restDays', {
                valueAsNumber: true
            })}
        />

        <select
            {...register(`incrementOrder`)}
        >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>


        <input placeholder="Increment Value" type="number" {...register('incrementValue', { valueAsNumber: true })} />
        <input placeholder="Increment Interval Per Days" type="number" {...register('incrementIntervalPerDays', { valueAsNumber: true })} />

        {
            fields.map((field, index) => (
                <div key={field.id}>

                    <input
                        type="number"

                        {...register(
                            `sets.${index}.reps`,
                            {
                                valueAsNumber: true
                            }
                        )}
                    />

                    <input
                        type="number"
                        placeholder="value"
                        {...register(`sets.${index}.progressionRule.value`, {
                            valueAsNumber: true
                        })}
                    />

                    <select
                        {...register(`sets.${index}.progressionRule.type`)}
                    >
                        <option value="reps">reps</option>
                        <option value="weight">weight</option>
                        <option value="rest">rest</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => remove(index)}
                    >
                        Delete
                    </button>

                </div>
            ))
        }

        <button
            type="button"

            onClick={() =>
                append({
                    reps: 10,
                    progressionRule: {
                        type: 'reps',
                        value: 1,
                    }
                })
            }
        >
            Add set
        </button>

        <button type="submit">
            Save
        </button>

    </form>
}

export default CreatingForm
