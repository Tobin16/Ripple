import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {BiPowerOff} from "react-icons/bi"
const LogOut = () => {

const navigate = useNavigate();

const handleClick = async () => {
    localStorage.clear();
    navigate('/login')
};


  return (
     <Button onClick={handleClick}>
        <BiPowerOff/>
     </Button>
   
  )
}


const Button = styled.button`

    
    
    border: none;
    border-radius: 0.4rem;
    color: white;
    
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    background-color: #34348a;
    &:hover{
        background-color: #39395b;
    }
    svg{
        font-size: 1rem;
    }
    



`;




export default LogOut;

