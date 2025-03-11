import { DoctorContext } from '@/context/DoctorContext'
import React, { useContext, useEffect } from 'react'

const DoctorAppointment = () => {

  const {doctorToken, appointments, getAppointments} = useContext(DoctorContext)

  useEffect(()=> {
    if(doctorToken){
      getAppointments()
    }
  },[doctorToken])
  
  return (
    <div>DoctorAppointment</div>
  )
}

export default DoctorAppointment