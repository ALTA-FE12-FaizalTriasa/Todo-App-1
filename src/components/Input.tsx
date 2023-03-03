import React, {FC} from 'react'

interface InputProps{
    label:string
    type:string
    onChange?:any
    value:any
}

const Input = () => {
    return (
        <div className='flex'>Input</div>
    )
}

export default Input