import { assets } from '@/assets/assets'
import { AdminContext } from '@/context/AdminContext'
import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'

const DashBoard = () => {

  const { dashData, getDashData, adminToken, cancelAppointment } = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (adminToken) {
      getDashData()
    }
  }, [adminToken])

  return dashData && (
    <div className='m-5'>

      <div className='flex gap-3 flex-wrap'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all border-gray-100'>
          <img src={assets.doctor_icon} alt="" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all border-gray-100'>
          <img src={assets.appointments_icon} alt="" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointment</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all border-gray-100'>
          <img src={assets.patients_icon} alt="" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white '>

        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Lastest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
              <img src={item.docData.image} alt="" className='rounded-full w-10' />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {
                item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> :
                <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer' />
              }
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default DashBoard