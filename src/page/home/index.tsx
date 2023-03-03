import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from "react-redux"
import { DarkMode, handleToDark, handleToLigth } from "../../features/darkModeSlice";
import { StatusState, handleToAktif } from '../../features/statusSlice';

import Layout from '../../components/Layout'
import Todo from '../../components/Todo'
import TodoList from '../../components/TodoList'
import { addTodo } from '../../features/todoSlice'
const Home = () => {
    
    const dispatch = useDispatch()
    const darkMode = useSelector((state: {darkMode: DarkMode}) => state.darkMode )
    const status = useSelector((state: {status: StatusState}) => state.status )
    
    console.log("status", status?.value)

    return (
        <Layout
        mode={darkMode?.value}
        >
            <Todo
            handleOf={()=> dispatch(handleToLigth())}
            handleOn={()=> dispatch(handleToDark())}
            mode={darkMode?.value}
            />
            <TodoList 
            status={status?.value}
            handleStatus={()=> dispatch(handleToAktif())}
            mode={darkMode?.value}
            />
        </Layout>
    )
}

export default Home