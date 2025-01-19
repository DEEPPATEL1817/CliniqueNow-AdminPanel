import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AdminContext } from '@/context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AdminAddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience,setExperience] = useState("1 Year")
  const [fees,setFees] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState("General physician")
  const [degree, setDegree] = useState('')
  const [address,setAddress] = useState('')

  const {backendUrl,adminToken} = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    try {
      if(!docImg){
        return toast.error("Upload image")
      }

      const formData = new FormData()

      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify(address))
      formData.append('about',JSON.stringify(about))

      //console log form data

      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`)
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor' ,formData,{headers:{adminToken}})
      console.log("data:" ,data)
      if(data.success){
        toast.success(data.message);
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress('')
        setAbout('')
        setDegree('')
        setFees('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log("Doctor is  already exist",error)
    }
  }

   return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center mt-4 gap-4 text-gray-400 '>
          <label htmlFor="doc-img">
            <img className='w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className='text-sm '>Upload Doctor Image</p>
        </div>
 
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg-flex-1 flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Doctor name</p>
              <Input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Doctor email</p>
              <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required/>
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Doctor Password</p>
              <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Experience</p>
              <Select   onValueChange={(value) => setExperience(value)} value={experience}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Years</SelectLabel>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Year</SelectItem>
                    <SelectItem value="3">3 Year</SelectItem>
                    <SelectItem value="4">4 Year</SelectItem>
                    <SelectItem value="5">5 Year</SelectItem>
                    <SelectItem value="6">6 Year</SelectItem>
                    <SelectItem value="7">7 Year</SelectItem>
                    <SelectItem value="8">8 Year</SelectItem>
                    <SelectItem value="10+">10+ Year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Fees</p>
              <Input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='Number' required  />
            </div>

          </div>

          <div className='w-full flex flex-col gap-4 my-4'>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Speciality</p>
              <Select onValueChange={(value)=>setSpeciality(value)} value={speciality}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="General physician">General physician</SelectItem>
                    <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                    <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                    <SelectItem value="Pediatricians">Pediatricians</SelectItem>
                    <SelectItem value="Neurologist">Neurologist</SelectItem>
                    <SelectItem value="Gastroenterologist">Gastroenterologist</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Education</p>
              <Input onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" placeholder='Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Address</p>
              <Textarea onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Type your address here." />
            </div>

          </div>
        </div>

        <div className='my-4'>
              <p>About</p>
              <Textarea  onChange={(e) => setAbout(e.target.value)} value={about} placeholder="About Doctor" required className='' />
            </div>

            <Button className="bg-primary text-white mt-8 items-center flex mx-auto my-6 px-10 py-6 text-lg ">Add Doctor</Button>
      </div>
    </form>
  )
}

export default AdminAddDoctor