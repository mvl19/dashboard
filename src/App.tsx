import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className=' w-screen max-w-[100%] h-screen flex justify-center'>
      <div className='w-full z-0'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
