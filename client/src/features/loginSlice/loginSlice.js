import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loginState: false,
    login: '',
    password: '',
    response: ''
}

export const loginSubmit = createAsyncThunk(
    'login/loginSubmit',
    async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const response = await axios.post('/login', formData, config)
        return response.data
    }
)

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        openloginState: (state) => {
            state.loginState = true
        },
        closeloginState: (state) => {
            state.loginState = false
        },
        formLoginSignIn: (state, action) => {
            state.login = action.payload
        },
        formPasswordSignIn: (state, action) => {
            state.password = action.payload
        },
        makeInitialStateLoginForm: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginSubmit.fulfilled, (state, action) => {
            state.response = action.payload
        })
    }
})

export const { openloginState, closeloginState, formLoginSignIn, formPasswordSignIn, makeInitialStateLoginForm } = loginSlice.actions

export default loginSlice.reducer