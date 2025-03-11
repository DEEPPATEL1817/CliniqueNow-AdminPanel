import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') ? localStorage.getItem('doctorToken') : '' ) 

    const [appointments, setAppoinments] = useState([])

    const getAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{doctorToken}})

            if(data){
                setAppoinments(data.appointment.reverse())
                console.log("appointment data of doctor:",data.appointments.reverse())
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("something went wrong to fetch all appointments of doctor:", error)
            toast.error(error.message)
        }
    }

    const value = {
        doctorToken ,
        setDoctorToken,
        setAppoinments,
        appointments,
        getAppointments
    }
    return (
        <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
    )
}

export {DoctorContextProvider}