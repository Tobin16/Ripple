import React ,{useState,useEffect}from 'react'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import styled from 'styled-components'
const ChatInput = ({handleSendMsg}) => {
const [showEmojiPicker, setshowEmojiPicker] = useState(false)
const [msg, setmsg] = useState("");
console.log(msg)
const handleClick = ()=>{
   setshowEmojiPicker(!showEmojiPicker)   
}

const handleEmojiClick = (emoji)=>{
 let message = msg 
 message += emoji.emoji;
 setmsg(message);
}

const sendChat = (event)=>{
  event.preventDefault()
  if(msg.length>0){
    handleSendMsg(msg);
    setmsg("");
  }
}



  return (
    <Container>
      <div className="button-container" >
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleClick}/>
            {
            showEmojiPicker && 
            <div className="emoji-picker">
                <Picker onEmojiClick={handleEmojiClick}/>
                </div>
            
           }
        </div>
      </div>
      <form className='input-container' onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder='type your message here' value={msg} onChange={(e) => setmsg(e.target.value)} />
        <button type = "submit" className="but">
            <IoMdSend/>
        </button>
      </form>
      
    </Container>
  )
}

const Container = styled.div`
height: 80%;

display: grid;
grid-template-columns: 5% 95% ;
align-items: center;
padding: 0.2rem;
padding-bottom: 0.3rem;
background-color: #21214f;

.button-container{
    display: flex;
    align-items: center;
    color: #83c92d;
    gap: 1rem;
    .emoji{
        position: relative;
        left: 0.8rem;
        top: 0.2rem;
      
        svg{
            font-size:1.5rem;
            cursor: pointer;
        }
        .emoji-picker {
        position: absolute;
        top: -470px;
        
        
                 
        }
      }
    }
  


.input-container{
    width: 100%;
    border-radius:2rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    background-color: #2e2e5b;
    input{
        height: 90%;
        width: 90%;
        color: white;
        background-color: transparent;
        border: none;
        font-size:1rem;
        padding: 0.2rem;
        padding-left:0.5rem;

        &::selection{
            background-color: #9a86f3;
        }
        
        &:focus{
            outline: none;

        }
    }
    .but{
        background-color: #5c5c9f;
        border: none;
        padding: 0.2rem 0.6rem;
        border-radius: 1rem;
        position: relative;
        left: 1rem;
       

        svg{
            
            border: none;
            font-size:1.5rem ;
            cursor: pointer;

        }
    }

      
}





`;

export default ChatInput
