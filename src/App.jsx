import React, { useContext } from 'react'
import Login from './pages/login';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/AdminPages/DashBoard';
import AllAppointments from './pages/AdminPages/AllAppointments';
import DoctorsList from './pages/AdminPages/DoctorsList';
import AdminAddDoctor from './pages/AdminPages/AdminAddDoctor';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashBoard from './pages/DoctorPages/DoctorDashBoard';
import DoctorProfile from './pages/DoctorPages/DoctorProfile';
import DoctorAppointment from './pages/DoctorPages/DoctorAppointment';

const App = () => {

  const { adminToken } = useContext(AdminContext)
  const {doctorToken} = useContext(DoctorContext)


  return adminToken || doctorToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
      <Sidebar />
      <Routes>
        {/* admin routes */}
        <Route path='/' element ={<></>} />
        <Route path='/admin-dashboard' element ={<DashBoard />} />
        <Route path='/all-appointments' element ={<AllAppointments />} />
        <Route path='/admin-add-doctor' element ={<AdminAddDoctor />} />
        <Route path='/doctor-list' element ={<DoctorsList />} />

        {/* doctor routes */}
        <Route path='/doctor-dashboard' element ={<DoctorDashBoard />} />
        <Route path='/doctor-appointments' element ={<DoctorAppointment />} />
        <Route path='/doctor-profile' element ={<DoctorProfile />} />
      </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login />
    <ToastContainer />
    </>
  )
}

export default App