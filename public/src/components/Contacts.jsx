import React from 'react'
import { useState,useEffect } from 'react'
import styled from 'styled-components'
import chatting from "../assets/chatting.png"
const Contacts = ({contacts , currentUser, changeChat}) => {
const [currentUserName, setCurrentUserName] = useState(undefined)
const [currentUserImage, setCurrentUserImage] = useState(undefined)
const [currentSelected, setCurrentSelected] = useState(undefined)


useEffect(() => {
 if(currentUser){
  setCurrentUserImage(currentUser.AvatarImage);
  setCurrentUserName(currentUser.username)
 }
}, [currentUser]);

const changeCurrentChat = (index,contact)=>{
  setCurrentSelected(index);
  changeChat(contact)
}

  return (
    <>
      <Container>
         <div className="brand">
          <img src={chatting} alt="logo" />
          <h3>Ripple</h3>
         </div>
         <div className="contacts">
          {
            contacts.map((contact,index)=>{
              return (
                <div className={`contact ${currentSelected === index ? "selected" : ""}`} 
                 key = {index}
                 onClick={()=>changeCurrentChat(index,contact)}
                 >
                  
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact.AvatarImage}`} alt="" />
                  </div>
                  
                  <div className="username">
                    <span> {contact.username} </span>
                  </div>
                  
                </div>
              )
            })
          }
         </div>
         <div className="current-user">
             <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                  </div>
                  
                  <div className="username">
                    <h2> {currentUserName} </h2>
                  </div>
         </div>
      </Container>
    </>
  )
  
}

const Container = styled.div`

color: white;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    img{
      height: 3rem;
    }
    h3{
      font-size : 1.5rem;
    }
   
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      display: flex;
      align-items: center;
      padding: 0.4rem;
      gap: 1rem;
      border-radius: 0.2rem;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      .avatar{
        img{
          height: 3rem;
        }
        .username{
          h3{
            color: white;
          }
        }     
      }
     
    }
    .selected {
        background-color: #7965cf;
      }

  }
  .current-user{
        background-color: #0d0d30 ;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        padding: 0.4rem;
        justify-content: center;
        .avatar{
        img{
          height: 4rem;
          max-inline-size: 100%;
        }
      }
       .username{
          h2{
          color:white;
          font-weight: bold;
      }
       
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
 



`;

export default Contacts
