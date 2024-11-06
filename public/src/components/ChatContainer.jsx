import React, { useRef } from 'react'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogOut from './LogOut';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({currentChat, currentUser, socket }) => {

const [messages, setmessages] = useState([])
const [arrivalMsg, setarrivalMsg] = useState(null)
const scrollRef = useRef();

const handleSendMsg = async (msg) => {
  await axios.post(sendMessageRoute,{
    from : currentUser._id,
    to: currentChat._id,
    message : msg
  });
  socket.current.emit("send-msg",{
    to: currentChat._id,
    from: currentUser._id,
    message : msg
  });
   
  const msgs = [...messages];
  msgs.push({fromSelf: true , message: msg});
  setmessages(msgs);

};


useEffect(() => {
  if(socket.current){
    socket.current.on("msg-receive", (msg)=>{
      setarrivalMsg({fromSelf: false, message:msg})

    })
  }
}, [])

useEffect(() => {
  arrivalMsg && setmessages((prev)=> [...prev, arrivalMsg ]);
}, [arrivalMsg]);


useEffect(() => {
  scrollRef.current?.scrollIntoView({behaviour: 'smooth'});
  
}, [messages]);





useEffect(() => {
  const fetchUser = async () => {
    if (currentUser && currentChat) {
      const response = await axios.post(getMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id
      });
      setmessages(response.data);
    }
  };
  fetchUser();
}, [currentChat]);


  return (
    <>
    { currentChat && (
      <Container>

<div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.AvatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <LogOut />
     </div>
     <div className="chat-messages">
       {
        messages.map((msg,index)=>{
          return (

            <div ref = {scrollRef} key = {uuidv4()} >
              <div className ={`message ${msg.fromSelf ? "sended" : "received"}`} >
                <div  className="content">
                   <p>
                     {msg.message}
                   </p>
                </div>
                
              </div>
            </div>
          )

        })
       }
     </div>
     <ChatInput handleSendMsg = {handleSendMsg}/>


      </Container> 
   )
   } 
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 82% 8%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-auto-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    padding-top: 1.5rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }

.chat-messages{
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar{
    width: 0.2rem;
    /* background-color: #2c1654; */
  }

  &::-webkit-scrollbar-thumb{
    background-color: #463b4c;
    border-radius: 1rem;    
  }

  .message{
    display: flex;
    align-items: center;
    .content{
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: white;
    }
  }
  .sended{
    justify-content: flex-end;
    .content{
      background-color: #4f04ff21;
    }

  }
  .received{
    justify-content: flex-start;
    .content{
      background-color: #4f04ff21;
    }
  }
}

`;

export default ChatContainer
