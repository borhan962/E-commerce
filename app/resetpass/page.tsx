'use client'
import axios from 'axios';
import { useFormik } from 'formik'
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


function validate(values: any) {

  const errors: any = {}

  return errors;
}

export default function Resetpassword() {
  const navegate = useRouter()
  const [err, setErr] = useState(false)
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validate,
    onSubmit: (values) => {
      regiestForm(values)
    },
  });

  async function regiestForm(values: any) {
    setLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((data) => {
        console.log(data);
        setUser(data.data.status)
        setLoading(false)
        navegate.push('./changePassword')
      }).catch((error) => {
        console.log(error.response.data.message)
        setErr(error.response.data.message)
        setLoading(false)
      })
  }

  return (
    <>
      <div id="toast-danger" className={` flex items-center absolute right-0 bottom-0 w-full max-w-xs ${err ? 'visible' : "hidden"} p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"  `} role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">{err}</div>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <div id="toast-success" className={`flex  items-center absolute ${user ? 'visible' : "hidden"} right-0 bottom-0 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"`} role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">{user}</div>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <form className="max-w-sm mx-auto mt-10" onSubmit={formik.handleSubmit} >
      <h1 className="text-lg font-bold">check your email for reset code</h1>
        <h2 className="my-5 ">reset code:</h2>



        <div className="mb-5">
          <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">code : </label>
          <input type="text" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} id="resetCode" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {formik.touched.resetCode && formik.errors.resetCode ? <div className='bg-red-500 rounded-lg ps-5 py-5'>{formik.errors.resetCode}</div> : null}
        </div>


        <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <span className="loader"></span> : <span>Submit</span>}</button>
      </form>

    </>
  )
}
