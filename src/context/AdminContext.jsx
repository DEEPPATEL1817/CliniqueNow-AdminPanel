import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [adminToken ,setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '' )

    const [doctors,setDoctors] = useState([])

    const [appointments , setAppointments] = useState([])

    const [dashData , setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/allDoctor' , {},{headers:{adminToken}})

            if (data) {
                setDoctors(data.doctors)
                console.log(data.doctors)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("error",error.message)
        }
    }

    const changeAvailiability =async (docId) => {
        try {
            const{data} = await axios.post(backendUrl + '/api/admin/change-availiability' , {docId},{headers:{adminToken}})

            if(data){
                toast.success(data.message)
                getAllDoctors()
            }else{
                console.log("toggle checkbox",error)
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllAppointments = async()=> {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{adminToken}})

            if (data){
                setAppointments(data.appointments)
                console.log("all appointment data: ",data.appointments)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{adminToken}} )
            if(data){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{adminToken}})
            if(data){
                setDashData(data.dashData)
                console.log("Dashboard data:" , data.dashData)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        doctors, 
        getAllDoctors,
        changeAvailiability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    }
    return (
        <AdminContext.Provider value={value}>
        {props.children}
        </AdminContext.Provider>
    )
}

export {AdminContextProvider}