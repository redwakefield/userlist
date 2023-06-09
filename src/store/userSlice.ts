import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { userSchema, User } from '../models/User';
import { EndPoints } from '../axios/api-config';
import { getAxios, deleteAxios } from '../axios/generic-api-calls';


export const fetchUsers = createAsyncThunk("user/fetchUsers",async () => {
    const response: AxiosResponse<User[]> = await getAxios(EndPoints.users);
    const users = response.data;

    userSchema.array().parse(users);
    return users;
});

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId: number) => {
        await deleteAxios(EndPoints.users, userId);
        return userId;
    }
)

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch users.";
        })
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to delete user.";
        });
    },
});

export const selectUsers = (state: any) => state.user.users;
export const selectLoading = (state: any) => state.user.loading;
export const selectError = (state: any) => state.user.error;


export default userSlice.reducer;