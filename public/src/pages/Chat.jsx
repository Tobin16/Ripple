import {React,useState,useEffect,useRef }from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Contacts from "../components/Contacts.jsx"
import { allUsersRoute, host } from '../utils/APIRoutes.js';
import Welcome from '../components/Welcome.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import {io} from "socket.io-client"
const Chat = () => {
const [contacts, setcontacts] = useState([])
const [currentUser, setcurrentUser] = useState(undefined)
const [currentChat, setcurrentChat] = useState(undefined)
const [isLoaded, setisLoaded] = useState(false)
const socket = useRef();
const navigate = useNavigate();

useEffect(() => {
  const fetchCurrentUser = async () => {
      const storedUser = localStorage.getItem("chat-app-user");
      if (!storedUser ) {
          navigate("/login");
      } else {
          setcurrentUser(JSON.parse(storedUser));
          setisLoaded(true);
      }
  };

  fetchCurrentUser();
}, [navigate]);

useEffect(() => {
  if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user",currentUser._id);
  }
  
}, [currentUser])


useEffect(() => {
  const fetchContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        try {
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          
          setcontacts(data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      } else {
        navigate('/setAvatar');
      }
    }
  };

  fetchContacts();
}, [currentUser,navigate]);

const handleChatChange = (chat) =>{
  setcurrentChat(chat);

}









  return (
    <>
      <Container>
          <div className="container">
            <Contacts currentUser = {currentUser} contacts = {contacts} changeChat = {handleChatChange}/>
            {
              isLoaded && currentChat === undefined ? (
                <Welcome currentUser={currentUser}/>

              ) : (
                
                <ChatContainer currentChat = {currentChat}  currentUser = {currentUser} socket = {socket}/>
              )
            }
            
          </div>
          
      </Container>
    </>
  )
}


const Container = styled.div`
height: 100vh;
width: 100vw;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #131324;

.container {
  background-color: #0d0d19;
  height: 85vh;
  width: 85vw;
  display: grid;
  grid-template-columns: 25% 75%;

  @media screen and (min-width : 720px) and (max-width : 1080){
    grid-template-columns: 35%  65% ;
  }
}

`;
export default Chat
