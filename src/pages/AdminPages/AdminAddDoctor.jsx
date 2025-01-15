import React from 'react'
import { assets } from '../../assets/assets'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AdminAddDoctor = () => {
  return (
    <form className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 text-gray-500 '>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt="" />
          </label>
          <input type="file" id="doc-img" hidden />
          <p>Upload Doctor Image</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg-flex-1 flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Doctor name</p>
              <Input type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Doctor email</p>
              <Input  type="email" placeholder="Email" required/>
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Doctor Password</p>
              <Input type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Experience</p>
              <Select>
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
              <Input type="number" placeholder='Number' required  />
            </div>

          </div>

          <div className='w-full flex flex-col gap-4 my-4'>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Speciality</p>
              <Select>
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
              <Input type="text" placeholder='Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 my-4'>
              <p>Address</p>
              <Textarea placeholder="Type your address here." />
            </div>

          </div>
        </div>

        <div className='my-4'>
              <p>About</p>
              <Textarea placeholder="About Doctor" required className='' />
            </div>

            <Button className="bg-primary text-white mt-8 items-center flex mx-auto my-6 px-10 py-6 text-lg">Add Doctor</Button>
      </div>
    </form>
  )
}

export default AdminAddDoctor