'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import "../globals.css";
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function Products() {
  
     function getData(){
      return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
     }

   const {data , isLoading , isError , error , isFetching } = useQuery({
    queryKey: ["products"],
    queryFn:getData
   })

  return (
    <>
    <div className='flex justify-center items-center h-screen'>
    {isLoading ? <FallingLines color="#4fa94d" width="100"  height='300px' z-index ="999999"  visible={true} /> :       
    <div className="container m-auto grid grid-cols-5 gap-3 mt-5">
        {data?.data.data.map((item : any) => (
          <div key={item._id} className="max-w-sm bg-white border w-72 h-fit border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg " src={item?.image} alt="" />
            <div className="p-5 h-20">
              <span className="mb-2 text-small text-green-700 tracking-tight  dark:text-white">{item?.name}</span>
            </div>
          </div>
        ))}
      </div>}
    </div>
    </>
  )
}
