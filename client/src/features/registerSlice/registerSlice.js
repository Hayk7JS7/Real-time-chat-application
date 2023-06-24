import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    registerState: true,
    name: '',
    lastname: '',
    email: '',
    login: '',
    password: '',
    response: ''
}

export const registerSubmit = createAsyncThunk(
    'register/registerSubmit',
    async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const response = await axios.post('/register', formData, config)
        return response.data
    }
)

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        openRegisterState: (state) => {
            state.registerState = true
        },
        closeRegisterState: (state) => {
            state.registerState = false
        },
        formLogin: (state, action) => {
            state.login = action.payload
        },
        formPassword: (state, action) => {
            state.password = action.payload
        },
        formName: (state, action) => {
            state.name = action.payload
        },
        formLastName: (state, action) => {
            state.lastname = action.payload
        },
        formEmail: (state, action) => {
            state.email = action.payload
        },
        makeInitialRegisterForm: (state) => {
            state.email = '',
            state.lastname = '',
            state.login = '', 
            state.password = '', 
            state.name = '',
            state.response = '',
            state.registerState = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerSubmit.fulfilled, (state, action) => {
            state.response = action.payload
        })
    }
})

export const { openRegisterState, closeRegisterState, formLogin, formPassword, formName, formLastName, formEmail, makeInitialRegisterForm } = registerSlice.actions

export default registerSlice.reducer