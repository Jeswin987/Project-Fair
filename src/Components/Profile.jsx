import React ,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Profile() {
    const [open, setOpen] = useState(false);
    const [userProfile,setUserProfile] = useState({
        username:"",email:"",password:"",Profile:"",github:"",linkedin:""
    })
    const [existingImage,setExistingImage] = useState("")
    const [preview,setPreview] = useState("")
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:"",github:user.github,linkedin:user.linkedin})
        setExistingImage(user.profile)
    },[])
    useEffect(()=>{
        if(userProfile.Profile){
            setPreview(URL.createObjectURL(userProfile.Profile))
        }else{
            setPreview("")
        }
    },[userProfile.Profile])

    const hadleProfileUpdate = async()=>{
        const {username,email,password,github,linkedin} = userProfile
        if(!github || !linkedin){
            toast.info('please fill form completly')
        }else{
            const reqBody=new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            reqBody.append("linkedin",linkedin)
        }
    }

  return (
    <div className='ms-4 card shadow p-5 mt-5' >
        <div className='d-flex justify-content-between'>
        <h3>My profile</h3>
        <button className='btn' onClick={() => setOpen(!open)}><i class="fa-solid fa-check"></i></button>
        </div>
        <Collapse in={open}> 
        <div className='row justify-content-center mt-3'>
            <label htmlFor="profile">
            <input id='profile' style={{display:'none'}} type="file" />
            <img width={'200px'} height={'200px'} className='rounded-circle' src="https://www.shareicon.net/data/512x512/2016/07/26/802043_man_512x512.png" alt="upload profile" />
            </label>
            <div className='mt-3'>
                <input className='form-control' type="text" placeholder='Github' value={userProfile.github} onChange={e=>setUserProfile({...userProfile,github:e.target.value})} />
            </div>
            <div className='mt-3'>
                <input className='form-control' type="text" placeholder='LinkedIn' value={userProfile.linkedin} onChange={e=>setUserProfile({...userProfile,linkedin:e.target.value})} />
            </div>
            <div className='mt-3 text-center d-grid'>
                <button className='btn btn-warning'>Update</button>
            </div>
        </div>
        </Collapse>
    </div>
    
  )
}

export default Profile