import { createAsyncThunk } from '@reduxjs/toolkit'
import type { UsersResponseType } from '../../types/responsesTypes/usersResponse.type'
import UsersService from '../../app/services/users.service'

export const fetchUsers = createAsyncThunk<UsersResponseType>(
    'users/fetchUsers',
    async (): Promise<UsersResponseType> => {
        const { data } = await UsersService.getAllUsers()
        return data
    }
)