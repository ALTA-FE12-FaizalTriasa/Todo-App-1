import React, {useState, FC , useEffect} from 'react'
import axios from 'axios'

type Data = {
    content: string
    due_date: string
    priority: number
    due_lang: string

}

type ModeType = {
    handleOn?: React.MouseEventHandler;
    handleOf?: React.MouseEventHandler;
    mode:boolean
}

const Todo: FC<ModeType>= ({
    handleOf,
    handleOn, 
    mode
}) => {

    const [data, setData] = useState<Data>({
        content: '',
        due_date: 'Today',
        priority: 2,
        due_lang: 'en'
})
    // const handleSubmit = (e:any) => {
    //     e.prevenDefault()

    //     console.log(value)
    // }
const createTask = async () =>{
    try {
        const response = await axios.post(`https://api.todoist.com/rest/v2/tasks `, 
        {
                content: data.content, 
                due_string: data.due_date, 
                priority: data.priority,
                due_lang: data.due_lang 
        },
        {
            headers : {
                Authorization: `Bearer ${import.meta.env.VITE_TODOIST_KEY}`
            }
        })

        alert("succes add task")
    } catch (error) {
        
    }
}

useEffect(() => {
    createTask()
},[])

    
    console.log(data)
    return (
        <div className={`card w-5/6 xl:w-3/6 bg-base-100 ${mode ?  "bg-slate-800" : "bg-violet-base-100" }  shadow-xl border mx-auto mt-10`}>
            <label className={`justify-start swap swap-rotate ${mode ? "text-white hover:text-slate-400" : "hover:text-slate-400" }`}>
                <input type="checkbox"/>
                <svg onClick={handleOn} className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                <svg onClick={handleOf} className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>  
            </label>
            <div className="card-body">
                <h2 className={`card-titlemx-auto text-xl md:text-4xl font-semibold mb-5 ${mode ?  "bg-slate-800 text-white" : "bg-base-100" }`}>Todo List</h2>
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 pb-6 md:justify-center lg:justify-center">
                <input className={`input border-2 input-info w-30 sm:w-96 sm:mx-auto md:w-60 xl:w-96 text-l lg:text-xl text-center placeholder-slate-400 md:h-12 md:mt-4 lg:mt-4 placeholder:text-center
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${mode ?  "bg-slate-600" : "bg-base-100" }`}
                type="text"
                name='content' 
                placeholder='Add Todo' 
                onChange={(e) => setData((data):any => ({...data, content: e.target.value}))} 
                value={data.content}/>
            {/* <div className="justify-center space-y-2 lg:space-y-4 lg:pt-0">
            <select value={data.due_date} onChange={(e) => setNewValue("todo", e.target.value)} className="select border-2 select-bordered w-full max-w-xs">
                <option disabled>Deadline</option>
                <option value={"today"}>Today</option>
                <option value={"Tommoow at 12:00"}>Tommorow at 12:00</option>
                <option value={"Next week"}>Next Week</option>
            </select>
            
            <select onChange={(e) => setNewValue("todo", e.target.value)} className="select border-2 select-bordered w-full max-w-xs">
                <option disabled>Priority</option>
                <option value={data.priority}>1</option>
                <option value={data.priority}>2</option>
                <option value={data.priority}>3</option>
                <option value={data.priority}>4</option>
            </select>
            </div> */}
            <div className='md:pt-2'>
                <button onClick={() => createTask()}
                className="btn bg-sky-500 w-32 text-white">Add Task</button>
            </div>
            </div>
            </div>
        </div>
        
    )
}


export default Todo