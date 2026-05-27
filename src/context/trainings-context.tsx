import { createContext, useContext, useEffect, useState } from "react"
import type { ITrainingsContext } from "./interfaces/trainings-context"
import type { ITraining } from "../shared/interfaces/training"
import { api } from "../api/api"

const TrainingsContext = createContext<ITrainingsContext>({
    trainings: [],
    loading: true,
    deleteTrainingById: () => { },
    setTrainings: () => { }
})

export function TrainingsProvider({ children }: { children: React.ReactNode }) {
    const [trainings, setTrainings] = useState<ITraining[]>([])
    const [loading, setLoading] = useState(true)

    // проверка при старте
    useEffect(() => {
        api.get('/trainings').then(
            res => {
                setTrainings(res)
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

    const deleteTrainingById = (id: number) => {
        api.delete(`/trainings/${id}`).then(
            () => setTrainings(prev => prev.filter(training => training.id !== id))
        )
    }

    return (
        <TrainingsContext.Provider value={{ trainings, loading, deleteTrainingById, setTrainings }}>
            {children}
        </TrainingsContext.Provider>
    )
}

export const useTrainings = () => useContext(TrainingsContext)