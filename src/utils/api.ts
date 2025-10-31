import Cookies from "js-cookie"
import { BASE_URL } from "./constants"

type PlayerBody = {
    user_name: string
    game_code: string
}

type LeaderBody = {
    is_leader: string
    game_code: string
}

export const createPlayer = async (body: PlayerBody | LeaderBody) => {
        try{
            const response = await fetch(`${BASE_URL}/creategame`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            const data = await response.json() 
            
            if (!response.ok) {
                throw new Error(data.error || 'ошибка загрузки')
            }
        
            const userGuid = data['user_GUID']

            Cookies.set('user_GUID', userGuid, {expires: 1})

            return userGuid
        } catch (e) {
            console.log((e as Error).message)
            throw e
        }
}




