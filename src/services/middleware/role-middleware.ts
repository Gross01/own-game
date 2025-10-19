import { Middleware } from "@reduxjs/toolkit"
import { clearRole, setRole } from "../user-info/slice"

export const roleMiddleware: Middleware = (store) => (next) => (action) => {

    const result = next(action)

    try {
        if (setRole.match(action)) {
            localStorage.setItem('role', action.payload)
        }

        if (clearRole.match(action)) {
            localStorage.removeItem('role')
        }
    } catch (e) {
        console.warn("Ошибка при работе с localStorage:", e);
    }

    return result
}