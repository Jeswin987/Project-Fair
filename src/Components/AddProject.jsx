import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../Contexts/ContextShare';
import { useContext } from 'react';

function AddProject() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);

  const [projectDetails,setProjectDetails]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })
  const [preview ,setPreview]=useState("")
  const [token,setToken]=useState("")

  const handleClose = () =>{
    setShow(false)
    setProjectDetails(
      {
        title:"",languages:"",overview:"",github:"",website:"",projectImage:""

      }
    )
    setPreview("")
  }
  const handleShow = () => setShow(true);
  // console.log(projectDetails);


  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }else{
    setToken("")
  }
},[])

const handleAdd=async(e)=>{
  e.preventDefault()
  const {title,languages,overview,projectImage,github,website}=projectDetails
  if(!title || !languages ||!overview || !projectImage ||!github ||!website){
    toast.info("please fill the form completely!!!")
  }else{
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("languages",languages)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)
    reqBody.append("github",github)
    reqBody.append("website",website)

    if(token){
     const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    // console.log(reqHeader);
    // console.log(reqBody);
    const result = await addProjectAPI(reqBody,reqHeader)
    if(result.status==200){
      console.log(result.data);
      handleClose()
      setAddProjectResponse(result.data)
    }else{
      console.log(result);
      toast.warning(result.response.data);

    }

  }

  }
}
console.log(token);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
            <div className="col-lg-6 ">
               <div className='d-flex justify-content-center align-items-center'>
                    <label htmlFor="project">
                        <input onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} id='project' type="file" style={{display:"none"}} />
                        <img height={"200px"} width={"300px"} src={preview?preview:"https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_960_720.png"} alt="" />
    
                    </label>
               </div>

            </div>
            <div className="col-lg-6">

                <div className='mb-3'>
                    <input value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} className='form-control' type="text"  placeholder='Project title'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.languages} onChange={(e)=>setProjectDetails({...projectDetails,languages:e.target.value})} className='form-control' type="text"  placeholder='Language used'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} className='form-control' type="text"  placeholder='Github link'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} className='form-control' type="text"  placeholder='Website link'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} className='form-control' type="text"  placeholder='Overview'/>
                </div>
                
                </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      < ToastContainer position='top-right' theme='colored'/>
    </>
  );
}

export default AddProject;