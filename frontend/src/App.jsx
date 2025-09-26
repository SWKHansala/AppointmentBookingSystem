import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation' // Add this import
import Home from './pages/Home' // Make sure the path is correct
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment' // Import the Appointment component

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
    </div>
  )
}

export default App