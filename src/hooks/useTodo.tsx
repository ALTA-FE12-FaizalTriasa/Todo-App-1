import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { useSelector } from "react-redux";
import { addTodoSlice, addTodo , TodoState } from "../features/todoSlice";


const Home = () => {
    
    
    const toDo =  useSelector((state: {toDo: TodoState}) => state.toDo)
    const [loading, setLoading] = useState(false)
    async function getTodo(){
        await axios.get(
        `  https://api.todoist.com/rest/v2/tasks `,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TODOIST_KEY}`
            }
        }
        )
        .then((responese) => {
            (responese.data)
            console.log(responese.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        getTodo()
    }, []);

    return (
        <>
    
        </>
    );
};