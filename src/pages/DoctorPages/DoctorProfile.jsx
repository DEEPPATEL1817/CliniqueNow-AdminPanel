import { AppContext } from '@/context/AppContext'
import { DoctorContext } from '@/context/DoctorContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {doctorToken, profileData, setProfileData, getProfileData,backendUrl} = useContext(DoctorContext)

  const {currency } = useContext(AppContext)

  const [isEdit , setIsEdit] = useState(false)

  const updateProfile = async () => {

    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }
      
      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData , {headers:{doctorToken}})

      if (data) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log("something wrong to update doctor profile",error)
    }
  }

  useEffect(()=> {
    if(doctorToken){
      getProfileData()
    }
},[])

  return profileData && (
    <div>

      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img src={profileData.image} alt="" className='bg-primary/80 w-full sm:max-w-64 rounded-lg' />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* doctor info : name , degree, experience */}
          <p className='flex items-center gap-2 text-3xl  font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* About Doctor */}

          <div>
            <p className='flex items-center gap-2 text-sm font-medium text-neutral-800 mt-3'>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fees: <span className='text-gray-800'>{currency}{isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees} /> : profileData.fees}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev,address:e.target.value}))} value={profileData.address} /> : profileData.address}</p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={()=> isEdit && setProfileData(prev => ({...prev,available:!prev.available}) )} checked={profileData.available} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>
            {
              isEdit 
              ?<button onClick={updateProfile} className='px-4 py-1 border border-primary  text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              :<button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary  text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
            }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile