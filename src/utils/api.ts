type TCheckRoom = {
    success: boolean    
}

export const checkRoomCode = async (code: string): Promise<TCheckRoom> => {
    try {
        const response = await fetch('http://localhost:3001/codecheck', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({code})
        }) 

        if (!response.ok) {
            throw new Error('Ошибка запроса')
        }
         
        return response.json()
    } catch (e) {
        console.log((e as Error).message)
        throw e
    }
}