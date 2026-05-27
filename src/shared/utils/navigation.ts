import type { NavigateFunction } from "react-router-dom"
import { getLocation } from "./location"

let navigate: NavigateFunction | null = null

export const setNavigate = (nav: NavigateFunction) => {
    navigate = nav
}

export const navigateTo = (path: string) => {
    if (navigate && path !== getLocation()) {
        navigate(path)
    }
}