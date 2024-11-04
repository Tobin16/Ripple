import React from 'react'
import { useState,useEffect } from 'react'
import styled from "styled-components"
import robot from "../assets/robot.gif"
const Welcome = ({currentUser}) => {

const [currentUserName, setcurrentUserName] = useState(undefined)

useEffect(() => {
    if(currentUser){
       setcurrentUserName(currentUser.username);
        }
    }, [currentUser]);


  return (
    <>
      <Container>
        <img src={robot} alt="robot" />
        <h1>
            welcome, <span>{currentUserName}!</span>
        </h1>
        <h3>
            Please select a chat to start messaging!
        </h3>

      </Container>
    </>
  )
}

const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
gap: 0.5rem;
padding-bottom: 5rem;

img{
    height: 18rem;
}

h1{
    color: white;
}
h3{
    color: white;
}




`;

export default Welcome
