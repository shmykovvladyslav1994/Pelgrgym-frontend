import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()

    if (loading) return <h2>Loading...</h2>

    if (user) return <Navigate to="/" replace />

    return children
}

export default PublicRoute