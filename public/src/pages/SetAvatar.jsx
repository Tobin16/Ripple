import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer , toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';
import loader from '../assets/loader.gif'

const SetAvatar = () => {
const navigate = useNavigate();
const [avatars, setAvatars] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedAvatar, setSelectedAvatar] = useState(undefined);
const api = `https://api.multiavatar.com/4645646`;
const toastOptions = {
    postion : "bottom-right",
    autoClose : 3000,
    pauseOnHover : true,
    draggable: true,
    theme : "dark"
  };
  

const setProfilePicture = async () =>{
if(selectedAvatar === undefined){
    toast.error("select an Avatar", toastOptions)
}
else {
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
       image : avatars[selectedAvatar] 
    });
    if(data.isSet){
        user.isAvatarImageSet = true;
        user.AvatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate('/');
    }else{
        toast.error("error setting avatar,please try again", toastOptions)
    }
}
};

useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate('/login');
    }
  }, [])



useEffect(() => {
    async function fetchAvatars() {
      const data = [];
      for (let i = 0; i<4; i++) {
        try {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString('base64'));
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
  
      setAvatars(data);
      setIsLoading(false);
    }
  
    fetchAvatars();
  }, []);






  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                 className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #131324;
gap: 1rem;
width: 100vw;
height:100vh;

.title-container {
    h1{
    color: white;
    font-weight: 600;
    font-size : 2rem;
    }
}
.avatars {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .avatar{  
    border:0.4rem solid transparent;
    padding:0.4rem;
    border-radius: 5rem;
    img{
        height: 6rem;
    }
    }
    .selected {
        border : 0.4rem solid #4e0eff;
    }
}

.submit-btn{
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



`;
export default SetAvatar
