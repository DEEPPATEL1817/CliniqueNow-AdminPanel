import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') ? localStorage.getItem('doctorToken') : '' ) 

    const [appointments, setAppointments] = useState([])

    const getAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{doctorToken}})
            console.log("data and token of doctor:",data)
            if(data){
                setAppointments(data.appointment.reverse())
                console.log("appointment data of doctor:",data.appointments.reverse())
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("something went wrong to fetch all appointments of doctor:", error)
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment' , {appointmentId},{headers:{doctorToken}})

            if(data){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("something went wrong to complete appointments of doctor:", error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment' , {appointmentId},{headers:{doctorToken}})

            if(data){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("something went wrong to complete appointments of doctor:", error)
            toast.error(error.message)
        }
    }

    const value = {
        doctorToken ,
        backendUrl,
        setDoctorToken,
        setAppointments,
        appointments,
        getAppointments,
        completeAppointment,
        cancelAppointment
    }
    return (
        <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
    )
}

export {DoctorContextProvider}