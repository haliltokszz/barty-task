import { useNavigate } from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../utils/fetch-wrapper';
import { history } from '../utils/history';

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

function createInitialState() {
    return {
        user: JSON.parse(localStorage.getItem('user')!),
        error: null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state : any) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/login');
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ username, password }) => await fetchWrapper.post(`${baseUrl}/login`, { username, password })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [`${pending}`]: (state : any) => {
                state.error = null;
            },
            [`${fulfilled}`]: (state : any, action : any) => {
                const user = action.payload;
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            },
            [`${rejected}`]: (state: any, action: any) => {
                state.error = action.error;
            }
        };
    }
}
