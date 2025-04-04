import { assets } from '@/assets/assets'
import { AdminContext } from '@/context/AdminContext'
import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect } from 'react'

const AllAppointments = () => {

  const { adminToken, appointments, setAppointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (adminToken) {
      getAllAppointments()
    }
  }, [adminToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] item-center text-gray-500 px-6 py-3 border-b hover:bg-gray-50' >
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex item-center gap-2'>
              <img src={item.userData.image} alt="" className='w-8 rounded-full' />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p className='max-sm:hidden'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex item-center gap-2'>
              <img src={item.docData.image} alt="" className='w-8 bg-gray-200 rounded-full' />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer' />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments