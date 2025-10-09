import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { BASE_URL } from "../../utils/constants";

export const createRoom = createAsyncThunk(
    'roomInfo/createRoom',
    async (_, thunkAPI) => {
        try{
            const response = await fetch(`${BASE_URL}/creategame`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'is_screen': 'true'})
            })
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue('Ошибка при создании комнаты')
            }

            const data = await response.json() 

            const userGuid = data['user_GUID']

            Cookies.set('user_GUID', userGuid, {expires: 1})

            return data['game_code']
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
    }
)
