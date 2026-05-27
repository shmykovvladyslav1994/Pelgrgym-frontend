import { useTrainings } from "../../context/trainings-context";

function TrainingsListContainer() {
    const { trainings, deleteTrainingById } = useTrainings()

    return (
        <>
            {trainings.map((training) => (
                <div key={training.id}>
                    <p>{training.name}</p>

                    <button onClick={() => deleteTrainingById(training.id)}>delete</button>
                </div>
            ))}
        </>
    );
}

export default TrainingsListContainer