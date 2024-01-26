import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    valute: [],
    loading: false,
    error: "",
    rates: {}
}

export const fetchValute = createAsyncThunk(
    "valute/fetchValute",
    async (__, {rejectWithValue}) => {
        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            if (!response.ok) {
                rejectWithValue("Loading Error!")
            }
           return await response.json()
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const fetchRates = createAsyncThunk(
    "valute/fetchRates",
    async (__, {rejectWithValue}) => {
        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/latest.js')
            if (!response.ok) {
                rejectWithValue("Loading Error!")
            }
           return await response.json()
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const valuteSlice = createSlice({
    name: 'valute',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchValute.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(fetchValute.fulfilled, (state, action) => {
                state.valute = action.payload.Valute
                state.loading = false
                state.error = ""
            })
            .addCase(fetchValute.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchRates.fulfilled, (state, action) => {
                state.rates = action.payload.rates
                state.loading = false
                state.error = ""
            })
    }
})

export default valuteSlice.reducer