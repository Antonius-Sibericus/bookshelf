import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UsersType } from './users.types'
import { StatusEnum } from '../general/general.types'
import { fetchUsers } from './users.async'
import type { UserType } from '../../types/entitiesTypes/user.type'

const initialState: UsersType = {
    status: StatusEnum.LOADING,
    users: [] as UserType[]
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<UserType[]>) {
            state.users = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = StatusEnum.LOADING,
            state.users = [] as UserType[]
        }),
        builder.addCase(fetchUsers.rejected, (state) => {
            state.status = StatusEnum.ERROR,
            state.users = [] as UserType[]
        }),
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.users = action.payload.users
        })
    }
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
