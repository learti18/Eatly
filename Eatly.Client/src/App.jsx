import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Blogs from './Pages/Blogs/Blogs';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
