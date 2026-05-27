import { navigateTo } from "../shared/utils/navigation"
import type { IRequestOptions } from "./interfaces/options"

const BASE_URL = import.meta.env.VITE_API_URL

// универсальная функция
async function request(url: string, options: IRequestOptions = {}) {
    const token = localStorage.getItem('token')

    if (!token && !url.includes('/auth/google')) {
        navigateTo('/login')
        return
    }

    const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    })

    // если токену жопа, то удаляем его и редиректим на логин
    if (res.status === 401) {
        localStorage.removeItem('token')
        navigateTo('/login')
        return
    }

    let data;

    try {
        data = await res.json()
    } catch (err) {
        data = 'ok'
    }

    if (!res.ok) {
        throw new Error(data.message || 'Request error')
    }

    return data
}

// методы
export const api = {
    get: (url: string) => request(url),
    post: (url: string, body: unknown) =>
        request(url, {
            method: 'POST',
            body: JSON.stringify(body),
        }),
    delete: (url: string) =>
        request(url, {
            method: 'DELETE',
        }),
}