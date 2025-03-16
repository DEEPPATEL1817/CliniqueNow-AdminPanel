import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') ? localStorage.getItem('doctorToken') : '' ) 

    const [appointments, setAppointments] = useState([])

    const [dashData, setDashData] = useState(false)

    const getAppointments = async()=>{
        try {
            console.log("doctor token before Api req:",doctorToken)
            const data =  await axios.get( backendUrl + '/api/doctor/doctor-appointments',{ headers: { doctortoken : doctorToken } })

            console.log("Full response:", data);
            if(data){
                
                setAppointments(data.data.appointments)
                console.log("appointment data of doctor:",data.data.appointments)
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
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment' , {appointmentId},{headers:{doctortoken : doctorToken }})

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
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment' , {appointmentId},{headers:{doctortoken : doctorToken }})

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

    const getDashData = async () => {
         
        try {
            
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{doctortoken : doctorToken }})
            
            if(data){
                setDashData(data.dashData)
                console.log("dashboard data of doctor:",data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("something went wrong to fetch data for dashboard:", error)
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
        cancelAppointment,
        getDashData,
        dashData,
        setDashData
    }
    return (
        <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
    )
}

export {DoctorContextProvider}