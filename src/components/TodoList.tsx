import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface TodoListProps{
    id?: string
    content?: string
    status?: boolean,
    handleDetail?: React.MouseEventHandler
    handleDelete?: React.MouseEventHandler
    handleStatus: React.MouseEventHandler
    mode: boolean
}

const TodoList:FC<TodoListProps> = ({mode, status, handleStatus}) => {

    const navigate = useNavigate()
    const [data, setData] = useState([])
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
            setLoading(true)
            setData(responese.data)
            console.log(responese.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTodo()
        editTodo()
    },[])
    async function editTodo() {
        axios.post(
            `  https://api.todoist.com/rest/v2/tasks/6665835416 `,
            {
                is_completed: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TODOIST_KEY}`
                }
            }
        )
        .then((reponse) => {
            console.log(reponse.data)
            setData([...data])
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const handledelete = async (id:string) =>{
            await axios.delete(`https://api.todoist.com/rest/v2/tasks/${id}`,
            {
                headers: {
                    Authorization : `Bearer ${import.meta.env.VITE_TODOIST_KEY}`
                }
            })
            .then((response) => {
                setData(response.data.filter((item:any) => item.id !== id ))
                alert("Your file is being deleted")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    
    return (
        <div className={`overflow-x-auto w-full mt-10`}>
            <table className={`table w-5/6 xl:w-3/6 mx-auto shadow-xl border`}>
                {/* head */}
                <thead className={`${mode ?  "bg-slate-800" : "bg-base-100" }`}>
                <tr className={`text-l justify-center`}>
                    <th>Item</th>
                    <th>Status</th>
                    <th className='text-center'>Action</th>
                </tr>
                </thead>
                { data && loading === true ? (
                data.map((item:any) => {
                    return(
                    <tbody className={`${mode ?  "bg-slate-800 text-white" : "bg-base-100" }`}>
                    <tr>
                        <td className={`${mode ?  "bg-slate-800" : "bg-base-100" }`}>
                        <div className="flex flrx-row justify-center space-x-3" id={item.id}>
                            <div className="font-bold text-center">
                                {item.content}
                            </div>
                        </div>
                        </td>
                        <td className={`w-1/3 ${mode ?  "bg-slate-800" : "bg-base-100" }`}>
                        { {status} ? (
                            <div className="text-red-500">
                                Non Active
                            </div>
                        ) : (
                            <div className="text-green-500">
                                Active
                            </div>
                        )}
                        
                        </td>
                        <th className={`justify-center space-y-2 w-1/4 flex flex-col md:flex-row md:space-y-0 md:space-x-5 md:mx-auto ${mode ?  "bg-slate-800" : "bg-base-100" }`}>
                        <button onClick={handleStatus} 
                        className="btn bg-sky-500 btn-md mx-auto text-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                        </button>
                        <button onClick={() => navigate(`/detail/${item.id}`, {
                            state: {
                                id: item.id
                            }
                        })} className="btn bg-green-500 btn-md mx-auto text-slate-800">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" />
                                <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z" clip-rule="evenodd" />
                                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                            </svg>
                        </button>
                        <button onClick={() => handledelete(item.id)} className="btn bg-red-500 btn-md mx-auto text-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                        </svg>
                        </button>
                        </th>
                    </tr>
                    </tbody>
                    )
                })
            ) : (
                <h1 className="flex justify-center">Please wait ...</h1>
            )}
            </table>
            </div>
    )
}

export default TodoList