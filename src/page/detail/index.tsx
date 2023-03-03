import React, {useEffect, useState, FC} from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import { DarkMode, handleToDark, handleToLigth } from "../../features/darkModeSlice";

import Layout from '../../components/Layout'
import DetailCard from '../../components/DetailCard';

type Detail = {
    item?: any
}

const Detail: FC<Detail> = ({item}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState(item)
    const dispatch = useDispatch()
    const darkMode = useSelector((state: {darkMode: DarkMode}) => state.darkMode )
    const [loading, setLoading] = useState(false)

    const id:string = location?.state?.id
    async function getTaskTodo(){
        await axios.get(
            `https://api.todoist.com/rest/v2/tasks/${id}`,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TODOIST_KEY}`
            }
        }
        )
        .then((responese) => {
            setLoading(true)
            setData(responese.data)
            console.log("task satuan", responese.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTaskTodo()
    },[])
    return (
        <Layout 
        mode={darkMode?.value}>
            { data && loading === true ? (
                
                        <DetailCard 
                        content={data.content}
                        date={data.due.string}
                        priority={data.priority}
                        handleHome={()=> navigate('/')}
                        />  
            ) : (
                <h1 className="flex justify-center">Please wait ...</h1>
            )}
        </Layout>
    )
}

export default Detail