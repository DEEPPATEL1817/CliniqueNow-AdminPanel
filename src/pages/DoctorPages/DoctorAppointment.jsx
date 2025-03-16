import { assets } from '@/assets/assets'
import { AppContext } from '@/context/AppContext'
import { DoctorContext } from '@/context/DoctorContext'
import React, { useContext, useEffect } from 'react'

const DoctorAppointment = () => {

  const { doctorToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (doctorToken) {
      getAppointments()
    }
  }, [doctorToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p>{index + 1}</p>
              <div>
                <img src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p>{item.payment ? 'Online' : 'Cash'}</p>
              </div>
              {/* <p>{calculateAge(item.userData.dob)}</p> */}
              <p>Calulating</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled 
                ? <p className='text-red-100 text-xs font-medium' >Cancelled</p> 
                : item.isCompleted 
                ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
                : <div>
                  <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                  <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="" />
                </div>
              }

            </div>
          ))
        }
      </div>


    </div>
    
  )
}

export default DoctorAppointment