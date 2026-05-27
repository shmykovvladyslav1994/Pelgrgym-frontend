import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/api'
import type { IAuthContext } from './interfaces/auth-context'
import type { IUser } from '../shared/interfaces/user'
import { navigateTo } from '../shared/utils/navigation'

const AuthContext = createContext<IAuthContext>({
    user: null,
    loginByGoogle: () => { },
    logout: () => { },
    loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)

    // проверка при старте
    useEffect(() => {
        const checkAuth = async () => {
            const res = await api.get('/auth/me')
            if (res) {
                setUser(res)
            } else {
                localStorage.removeItem('token')
                setUser(null)
            }

            setLoading(false)
        }

        checkAuth()
    }, [])

    const loginByGoogle = (data: { token: string; user: IUser }) => {
        localStorage.setItem('token', data.token)
        setUser(data.user)
        navigateTo('/')
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loginByGoogle, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)