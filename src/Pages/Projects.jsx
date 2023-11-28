import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import { allProjectsAPI } from '../services/allAPI'

function Projects() {
  const [allprojects,setAllprojects] = useState([])
  const [searchKey,setSearchkey] = useState("")
  const getallProjects = async()=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectsAPI(searchKey,reqHeader)
      if(result.status===200){
        setAllprojects(result.data)
      }
      else{
        console.log(result);
      }
    }
  }
  useEffect(()=>{
    getallProjects()
  },[searchKey])
  return (
    <div>
       <Header/>
      <h1 className='text-center mt-4'>All Projects</h1>
<div className='d-flex justify-content-center mt-5'>
  <div className='d-flex justify-content-center w-50'>
          <input onChange={(e)=>setSearchkey(e.target.value)} className='form-control' type="text" placeholder='Search projects by technologies' /> <button className='btn btn-dark'>Search</button>
    
  </div>
</div>    
<Row className='container'>
  {allprojects?.length>0?allprojects?.map(project=>(
  <Col sm={12} md={6} lg={4} >
    <ProjectCard project={project} />
  </Col>)): 
  <p>Please  Login</p>
  
  }
</Row>

</div>
  )
}

export default Projects
