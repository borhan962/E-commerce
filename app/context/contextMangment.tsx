'use client'
import React, { createContext, useState } from 'react'
export const store = createContext({
  token: null ,
  setToken : {}
})

export default function Context(props:any) {

    const [token , setToken] = useState(null)
    
  return (
    <>
     <store.Provider value={{ token , setToken }}>
        {props.children}
     </store.Provider>
    </>
  )
}
