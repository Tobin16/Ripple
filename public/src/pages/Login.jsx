import React, { useState , useEffect} from 'react'
import { json, Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from '../assets/chatting.png';
import {ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {

const navigate = useNavigate();
const [values, setvalues] = useState({
    username : "",
    password : "",
    
})
const toastOptions = {
  postion : "bottom-right",
  autoClose : 3000,
  pauseOnHover : true,
  draggable: true,
  theme : "dark"
};

useEffect(() => {
  if(localStorage.getItem("chat-app-user")){
    navigate('/');
  }
}, [])


const handleSubmit = async (event) =>{
  event.preventDefault();
  if(handleValidation()){
    const {password , username, email} = values;
     const {data} = await axios.post(loginRoute,{
      username,
      password
     });

     if(data.status == false){
      toast.error(data.msg, toastOptions)
     }
     if(data.status == true){
      
      localStorage.setItem("chat-app-user",JSON.stringify(data.user));
      navigate('/');
     }

     
  };
}

const handleChange = (e)=>{
    
    setvalues({...values, [e.target.name] : e.target.value})
    
}



const handleValidation = () => {
  const {password , username} = values;
  if(password === ""){
    toast.error(
      "password  is required.",
      toastOptions
    );
    return false;
  }
  else if(username.length < 3){
    toast.error(
      "username is required.",
      toastOptions
    );
    return false;
  }
  return true;
}


  return (
    <>
    <FormContainer>
       <form onSubmit={handleSubmit}>
        <div className="brand">
            <img src= {Logo} alt="Logo" />
            <h1>Ripple</h1>
        </div>
        <input type="text" name = "username" placeholder='Username' onChange={(e) => handleChange(e)}/> 
        <input type="password"  name = "password" placeholder='password' onChange={(e) => handleChange(e)}/>
        
        <button type='submit'>Login</button>

        <span>Don't have an accout ? <Link to="/register">Register</Link> </span>
       </form>

    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height : 100vh;
  width : 100vw;
  display : flex;
  flex-direction : column;
  justify-content: center;
  gap :1rem;
  align-items : center;
  color : white;
  background-color : #131324;
  .brand{
    display:flex;
    flex-direction: rows;
    gap: 0.3rem;
    align-items: center;
    justify-content: center;
  }
     img{
     height: 5rem;
     h1{
    text-transform: uppercase;
     }
   }
   form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #303056;
    padding: 3rem 5rem;
    border-radius: 2rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #33338a;
      width: 100%;
      color:white;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button{
      background-color: #4b4b90;
      padding: 1rem 2rem;
      color: white;
      border: none;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase; 
      &:hover{
        background-color: #3d3d6b;
      }

      transition: 0.5s ease-in-out;
    }

    span {
      a{
        text-decoration:none;
        color: #6060f4;
      }
    }

   }

`;
export default Login;
