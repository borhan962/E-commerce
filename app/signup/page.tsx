'use client'
import axios from 'axios';
import { useFormik } from 'formik'
import Link from 'next/link';
import { redirect , useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "../globals.css";

function  validate(values : any){
 
  const errors:any = {}
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.name = 'Must be 3 characters or more';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  if (!values.rePassword) {
    errors.rePassword = 'Required';
  } else if (values.rePassword !== values.password) {
    errors.rePassword = 'Passwords do not match';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/i.test(values.email)) {
    errors.phone = 'Invalid email address';
  }

      return errors;
}


 
export default function Singup() {
  const navegate = useRouter()
  const [err , setErr] = useState(false)
  const [user , setUser] = useState(false)
  const [loading , setLoading] = useState(false)
  const formik =  useFormik({
    initialValues: {
      name: "",
      email: '',
      password: '',
      rePassword: '',
      phone:"",
      },
       validate,
      onSubmit:(values)=> {
        regiestForm(values)
      },
    });

   async function regiestForm(values:any){
    setLoading(true)
      return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
      .then((data) => {
      console.log(data.data.message);
      setUser(data.data.message)
      setLoading(false)
      navegate.push("./login") 
        }).catch((error)=>{
          console.log(error);
         setErr(error.response.data.message)
         setLoading(false)
        })
    }

    function toForgetPasswordPage(){
      navegate.push("./forget") 
    }

  return (
    <>

<form className="max-w-sm mx-auto mt-10" onSubmit={formik.handleSubmit} >
<div id="toast-danger" className= { ` flex items-center absolute right-0 bottom-0 w-full max-w-xs ${err? 'visible' : "hidden"} p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"  `} role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span className="sr-only">Error icon</span>
    </div>
    <div className="ms-3 text-sm font-normal">{err}</div>
    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>
<div id="toast-success" className= {  `flex  items-center absolute ${user? 'visible' : "hidden"} right-0 bottom-0 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"` } role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span className="sr-only">Check icon</span>
    </div>
    <div className="ms-3 text-sm font-normal">{user}</div>
    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
    </div>
  <h1 className="mb-5 text-lg font-bold">Register:</h1>
<div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
    <input type="text" id="name"  value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    {formik.touched.name && formik.errors.name? <div className='bg-red-500 rounded-lg ps-5 py-5'>{formik.errors.name}</div> : null}
  </div>

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com"  />
    {formik.touched.email && formik.errors.email ? <div className='bg-red-500 rounded-lg ps-5 py-5'>{formik.errors.email}</div> : null}
  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
    {formik.touched.password && formik.errors.password ? <div className='bg-red-500 rounded-lg ps-5 py-5'>{formik.errors.password}</div> : null}
  </div>

  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
    <input type="password" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
    {formik.touched.rePassword && formik.errors.rePassword ? <div className='bg-red-500 rounded-lg ps-5 py-5'>{formik.errors.rePassword}</div> : null}
  </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
    <input type="number" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
    {formik.touched.phone && formik.errors.phone ? <div className='bg-red-500 rounded-lg ps-5 py-5'>{formik.errors.phone}</div> : null}
  </div>
   <div className="flex justify-between items-center">
   <button type="submit" disabled={!(formik.isValid && formik.dirty)}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? <span className="loader"></span> :<span>Submit</span>}</button>
   <a onClick={toForgetPasswordPage} style={{cursor:"pointer"}}>forget password</a>
   </div>
</form>

    </>
  )
}
