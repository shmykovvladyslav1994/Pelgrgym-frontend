import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import { TrainingsProvider } from '../context/trainings-context'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <h2>Loading...</h2>

  if (!user) return <Navigate to="/login" replace />

  return <TrainingsProvider>{children}</TrainingsProvider>
}

export default ProtectedRoute