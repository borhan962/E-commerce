'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const store = createContext({
  token: null,
  setToken: {},
  err: false,
  user: false,
  loadCart: false,
  addToCart : {},
  getCardData: {},
  numCart : 0,

})

export default function Context(props: any) {

  const [err, setErr] = useState(false)
  const [user, setUser] = useState(false)
  const [numCart , setNumCart] = useState(0)
  const [loadCart, setLoadCart] = useState(false)
  const [token, setToken] = useState(null)

  async function addToCart(productId: any) {
    setLoadCart(true)

    return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId },
      {
        headers: {
          token
        }
      }

    ).then((data) => {
      // console.log(data.data.numOfCartItems)
      setUser(data.data.message)
      setNumCart(data.data.numOfCartItems)
      setLoadCart(false)
      return data 
    }).catch((err) => {

      console.log(err)
      setErr(err.data.data.message)
      return err

    })


  }


  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"))
    }
  }, [])

  return (
    <>
      <store.Provider value={{ token, setToken, addToCart, err, user, loadCart , numCart  }}>
        {props.children}
      </store.Provider>
    </>
  )
}
