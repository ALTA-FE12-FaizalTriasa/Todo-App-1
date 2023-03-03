import { createSlice } from '@reduxjs/toolkit'


export interface StatusState {
    value: boolean
}
const initialState : StatusState = {
    value: false
}

export const addStatusSlice = createSlice({
    name:'status',
    initialState,
    reducers:{
        handleToAktif(state){
            state.value = true
        }
    }
})


export const {handleToAktif} =  addStatusSlice.actions