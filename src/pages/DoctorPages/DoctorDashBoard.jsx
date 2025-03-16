import { assets } from '@/assets/assets'
import { AppContext } from '@/context/AppContext'
import { DoctorContext } from '@/context/DoctorContext'
import React, { useContext, useEffect } from 'react'

const DoctorDashBoard = () => {

  const { doctorToken, dashData, setDashData, getDashData,completeAppointment,cancelAppointment } = useContext(DoctorContext)
  const {currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (doctorToken) {
      getDashData()
    }
  }, [doctorToken])


  return dashData && (
    <div className='m-5'>

      <div className='flex gap-3 flex-wrap'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all border-gray-100'>
          <img src={assets.earning_icon} alt="" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency}{dashData.earnings}</p>
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
                    <img src={item.userData.image} alt="" className='rounded-full w-10' />
                    <div className='flex-1 text-sm'>
                      <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                      <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                    </div>
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
                ))}
              </div>
      
            </div>
    </div>
  )
}

export default DoctorDashBoard