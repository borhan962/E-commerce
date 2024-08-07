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

})

export default function Context(props: any) {

  const [err, setErr] = useState(false)
  const [user, setUser] = useState(false)
  const [loadCart, setLoadCart] = useState(false)
  const [token, setToken] = useState(null)

  async function addToCart(productId: any) {

    useEffect(() => {
      if (localStorage.getItem("userToken")) {
        setToken(localStorage.getItem("userToken"))
      }
    }, [])
    
    setLoadCart(true)

    return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId },
      {
        headers: {
          token
        }
      }

    ).then((data) => {
      console.log(data)
      setUser(data.data.message)
      setLoadCart(false)
      return data 
    }).catch((err) => {

      console.log(err)
      setErr(err.data.data.message)
      return err

    })

  }




  return (
    <>
      <store.Provider value={{ token, setToken, addToCart, err, user, loadCart  }}>
        {props.children}
      </store.Provider>
    </>
  )
}
