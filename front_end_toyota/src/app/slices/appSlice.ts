import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../../utils/interface';

const initialState: {
    auth: IAuth;
} = {
    auth: {
        IsLoginIn: false,
        user: null,
        tokens: null,
    },
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: initialState,
    reducers: {
        loginSucessAction: (state, action) => {
            if (!action.payload) return;
            state.auth.IsLoginIn = true;
            state.auth.user = action.payload.user;
            state.auth.tokens = action.payload.tokens;
        },
        logOutAction: (state) => {
            state.auth.IsLoginIn = false;
            state.auth.user = null;
            state.auth.tokens = null;
        },
        updateTokens: (state, action) => {
            state.auth.tokens = action.payload;
        },
    },
});

export const { loginSucessAction, logOutAction, updateTokens } = appSlice.actions;
export default appSlice.reducer;
