'use client'
import React, { useContext, useEffect , useState } from 'react'
import { store } from '../context/contextMangment'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from '@tanstack/react-query'
import Products from '../products/page';
import Link from 'next/link';


export default function Cart() {
  const [newCart , setNewCart] = useState({})
  const [loading , setLoading] = useState(false)
  const [numCart , setNumCart] = useState(0)

  const { token } = useContext(store)



 async  function getCart(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token
      }
    })
   }

 const {data , isLoading , isError , error , isFetching } = useQuery({
  queryKey: ["Cart"],
  queryFn:getCart,
  refetchInterval: 500
 }
)



 async function deleteFromCart(productId: any) {
  return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }`, {
    headers: {
      token
    }
    }

  ).then((data) => {
    console.log(data.data.numOfCartItems)
    return data 
  }).catch((err) => {

    console.log(err)
    return err

  })
}


async function updateCountOfCart(productId: any, count: any) {
  const config = {
    headers: {
      token
    }
  };

  return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }`,
    {count},
    config

  ).then((data) => {
    console.log(data.data.numOfCartItems)
    setNumCart(data.data.numOfCartItems)
    return data
  }).catch((err) => {
    console.log(err)
    return err
  })
}


  if (data?.data.numOfCartItems == 0) {
    return <h2 className= "flex text-lg font-bold justify-center m-5">empty cart</h2>
  }else if(token === null) {
    return <h3 className= "flex text-lg font-bold justify-center m-5">Login First Please</h3>
  }



  return (
    <> 

        <div className='flex justify-center items-center h-screen'>
        {isLoading ? <FallingLines color="#4fa94d" width="100"  height='300px' z-index ="999999"  visible={true} /> :
      <div className="container mx-auto h-screen relative  m-5 items-center justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {data?.data.data.products.map((item: any) => (
                <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                  <Link href={"./productDetails/" + item?.product.id}>
                    <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.product?.title.slice(0,80)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={()=>updateCountOfCart(item.product.id , item.count -1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        -
                      </button>
                      <div>
                        <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={item.count} readOnly />
                      </div>
                      <button onClick={()=>updateCountOfCart(item.product.id , item.count +1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                       +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.price + " EGP"}
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>deleteFromCart(item.product.id)}>Remove</button>
                  </td>   
                </tr>
              ))}
            </tbody>  
            <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">Total</th>
                <td></td>
                <td className="px-6 py-3 font-semibold text-gray-900 dark:text-white">{data?.data.numOfCartItems}</td>
                <td className=" py-3 ">{"total Price: " + data?.data.data.totalCartPrice}</td>
                <td>

                  <Link href={"./address/" + data?.data.data._id} >
                  <button className='bg-green-400 rounded-lg p-3'>CheckOut</button>
                  </Link>
                  
                </td>
            </tr>
        </tfoot>
          </table>
        </div>
          
      </div>
        } 
      </div>
    </>
  )
}
