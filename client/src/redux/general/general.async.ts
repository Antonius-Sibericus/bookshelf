import { createAsyncThunk } from '@reduxjs/toolkit'
import UsersService from '../../app/services/users.service'
import type { UserResponseType } from '../../types/responsesTypes/userResponse.type'

export const fetchCurrentUser = createAsyncThunk<UserResponseType, string>(
    'general/fetchCurrentUser',
    async (userId: string): Promise<UserResponseType> => {
        const { data } = await UsersService.getOneUser(userId)
        return data
    }
)