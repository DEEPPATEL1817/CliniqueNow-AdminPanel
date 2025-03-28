import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '@/context/DoctorContext';



const Login = () => {
  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAdminToken, backendUrl } = useContext(AdminContext)
  const { setDoctorToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      console.log("backend url", backendUrl)

      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/admin-login', { email, password })
        console.log("token ", data)
        if (data) {
          console.log("token", data.token)
          localStorage.setItem("adminToken", data.token)
          setAdminToken(data.token)
        }
        else {
          toast.error(data.message || "Invalid credentials")
        }
      } 
      else{
        console.log("Request payload:", { email, password });
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })

        if (data) {
          console.log("token", data.doctorToken)
          localStorage.setItem("doctorToken", data.doctorToken)
          setDoctorToken(data.doctorToken)
          console.log("token of doctor",data.doctorToken)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log("error in login :", error)
    }
  }




  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto '><span className='text-primary'> {state} </span>
          Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-600 rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-600 rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full p-2 rounded-md hover:bg-blue-700'>Login</button>
        {
          state === "Admin" ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='cursor-pointer underline text-primary'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='cursor-pointer underline text-primary'>Click here</span></p>

        }
      </div>
    </form>
  )
}

export default Login