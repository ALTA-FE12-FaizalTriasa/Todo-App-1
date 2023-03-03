import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
    id: string
    content: string
    due_date: string
}
export interface TodoState{
    item: Item[]
}
const initialState: TodoState = {
    item: []
} 

export const addTodoSlice  = createSlice({
    name: "toDo",
    initialState , 
    reducers:{
        addTodo: (state, actions: PayloadAction<Item>) => {
            state.item.push(actions.payload)
            return state
        },
        setTodo: (state, actions) => {
            state.item = actions.payload
            return state
        },
        removeTodo: (state, actions: PayloadAction ) => {
            const removeItem = state.item.filter((item:any) => {
                item.id !== actions.payload
            })
            state.item = removeItem
        },
        updateStatus: (state, actions: PayloadAction<Item>) => {
            const updateAt = (new Date().toLocaleString())
            state.item = state.item.map((item:any) => item.id === actions.payload.id ? { ...item, is_completed:true, updateAt} : item)
        }
    }
})

export const {addTodo} = addTodoSlice.actions