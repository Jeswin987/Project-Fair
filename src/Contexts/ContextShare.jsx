import React, { createContext, useState } from 'react'

export const addProjectResponseContext=createContext()
function ContextShare({children}) {
    const [addProjectResponse,setAddprojectResponse]=useState({})
  return (
    <>

    <addProjectResponseContext.Provider value={{addProjectResponse,setAddprojectResponse}}>
        {children}

    </addProjectResponseContext.Provider>
    
    </>
  )
}

export default ContextShare