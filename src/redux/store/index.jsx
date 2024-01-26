import { configureStore } from '@reduxjs/toolkit'
import valuteReducer from '../slice/valuteSlice'

const store = configureStore({
    reducer: {
        valute: valuteReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store