import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { useAuth } from '../../context/auth-context'
import { api } from '../../api/api'
import type { IUser } from '../../shared/interfaces/user'

function Login() {
    console.log('Login rendered');

    const { loginByGoogle } = useAuth()

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        const res: { token: string; user: IUser } = await api.post('/auth/google', {
            token: credentialResponse.credential
        })

        loginByGoogle(res)
    }

    return <GoogleLogin onSuccess={handleSuccess} />
}

export default Login