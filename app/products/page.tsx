'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import "../globals.css";
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function Products() {

  // const [loading, setLoading] = useState(false)

  // const [product, setProduct] = useState([

  //   {
  //     imageCover: "",
  //     category: {
  //       slug: ''
  //     },
  //     title: "",
  //     price: 0,
  //     ratingsAverage: 0,
  //     id: 0

  //   }
  // ])

  // async function getProduct() {
  //   setLoading(true)
  //   return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((data) => {
  //       console.log(data.data.data)
  //       setProduct(data.data.data)
  //       setLoading(false)
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  // }

  // useEffect(() => {
  //   getProduct() 
  // }, [])




   async  function getData(){
      return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
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
          <div key={item?.id} className="max-w-sm bg-white border w-72 h-fit border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link href={"./productDetails/" + item?.id}>
              <img className="rounded-t-lg " src={item?.imageCover} alt="" />
              </Link>
            <div className="p-5 h-20">
              <span className="mb-2 text-small text-green-700 tracking-tight  dark:text-white">{item?.category?.slug}</span>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.title?.slice(0, 25)}</p>
            </div>
            <div className='flex px-5 pb-3 justify-between items-center'>
              <p>
                {item?.price + " EGP"}
              </p>
              <div className=" flex items-center ">
                {item?.ratingsAverage}
                <FaStar className="text-yellow-400 ms-2" />
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
    </>
  )
}
