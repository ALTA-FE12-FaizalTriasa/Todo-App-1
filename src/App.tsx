import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './page/home';
import Detail from './page/detail';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/detail/:id' element={<Detail/> }/>
      </Routes>
    </BrowserRouter>
  )
}


export default App
