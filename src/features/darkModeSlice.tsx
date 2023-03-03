import { createSlice } from '@reduxjs/toolkit'


export interface DarkMode {
    value: boolean
}
const initialState : DarkMode = {
    value: false
}

export const darkModeSlice = createSlice({
    name:'darkMode',
    initialState,
    reducers:{
        handleToDark(state){
            state.value = true
        },
        handleToLigth(state){
            state.value = false
        }

    }
})


export const {handleToDark, handleToLigth} =  darkModeSlice.actions