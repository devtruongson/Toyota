import { createSlice } from '@reduxjs/toolkit';
import { IAuth, ICar, ICate } from '../../utils/interface';

const initialState: {
    auth: IAuth;
    cates: ICate[];
    currentCar: number | null;
    carActive: ICar[];
    currentBlog: number | null;
} = {
    auth: {
        IsLoginIn: false,
        user: null,
        tokens: null,
    },
    cates: [],
    currentCar: null,
    carActive: [],
    currentBlog: null,
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
        saveCate: (state, action) => {
            if (!action.payload) return;
            state.cates = action.payload;
        },
        deleteCate: (state) => {
            state.cates = [];
        },

        saveCurrentcar: (state, action) => {
            state.currentCar = action.payload;
        },

        saveCarActive: (state, action) => {
            state.carActive = action.payload;
        },

        saveBlog: (state, action) => {
            state.currentBlog = action.payload;
        },
    },
});

export const {
    loginSucessAction,
    logOutAction,
    updateTokens,
    saveCate,
    deleteCate,
    saveCurrentcar,
    saveCarActive,
    saveBlog,
} = appSlice.actions;
export default appSlice.reducer;
