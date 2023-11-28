import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';

function EditProject({project}) {
    const [projectDetails,setProjectDetails] = useState({
        title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
    })
    const [preview,setPreview] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
      const handleShow = () => setShow(true);
  return (
    <>
    <button onClick={handleShow} className='btn'> <i class="fa-solid fa-pen-to-square fa-2x"></i></button>
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
                        <input  id='project' type="file" style={{display:"none"}} />
                        <img height={"200px"} width={"300px"} src={`${BASE_URL}/uploads/${project.projectImage}`} alt="" />
    
                    </label>
               </div>

            </div>
            <div className="col-lg-6">

                <div className='mb-3'>
                    <input value={project.title}  className='form-control' type="text"  placeholder='Project title'/>
                </div>
                <div className='mb-3'>
                    <input  value={project.languages}  className='form-control' type="text"  placeholder='Language used'/>
                </div>
                <div className='mb-3'>
                    <input  value={project.github} className='form-control' type="text"  placeholder='Github link'/>
                </div>
                <div className='mb-3'>
                    <input  value={project.website}  className='form-control' type="text"  placeholder='Website link'/>
                </div>
                <div className='mb-3'>
                    <input  value={project.overview} className='form-control' type="text"  placeholder='Overview'/>
                </div>
                
                </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button  variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject