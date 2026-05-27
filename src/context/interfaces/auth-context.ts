import type { IUser } from "../../shared/interfaces/user";

export interface IAuthContext {
    user: IUser | null
    loginByGoogle: (data: { token: string; user: any }) => void
    logout: () => void
    loading: boolean
}