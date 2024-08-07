'use client'
import { store } from '@/app/context/contextMangment'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useContext } from 'react'
import { FaStar } from 'react-icons/fa6'
import { FallingLines } from 'react-loader-spinner'


interface detailsProduct {
  imageCover: "",
  category: {
    slug: '',
    name: ""
  },
  title: "",
  price: 0,
  ratingsAverage: 0,
  id: 0,
  description: "",

}



export default function Details() {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<detailsProduct>()
  const { id } = useParams()
  const { addToCart, err, user, loadCart } = useContext(store)

  async function getProduct() {
    setLoading(true)
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        console.log(data.data.data)
        setProduct(data.data.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getProduct()
  }, [])



  function addProductToCart(productId: any) {

    addToCart(productId)
    
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

      <div className='flex justify-center items-center h-screen'>
        {loading ? <FallingLines color="#4fa94d" width="100" height='300px' z-index="999999" visible={true} /> :
          <div className='flex justify-center items-center'>
            <div key={product?.id} className="container m-auto grid grid-cols-3 items-center mt-5">
              <div>
                <img src={product?.imageCover} alt="" />
              </div>
              <div className=" col-span-2  ">
                <h5 className='text-lg font-bold mb-2'>{product?.title}</h5>
                <p className="mb-2">{product?.description}</p>
                <p className="text-green-700 mb-2">{product?.category.name}</p>
                <p className=" mb-2">{product?.price + " EGP"}</p>
                <button onClick={() => addProductToCart(product?.id)} className="bg-green-400 text-black rounded-lg w-full py-3">{loadCart ? <span className="loader"></span> : <span>ADD TO CART</span>}</button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
