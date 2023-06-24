import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice/registerSlice";
import loginReducer from "../features/loginSlice/loginSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer
    }
})

export default store