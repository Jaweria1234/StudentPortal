import React from "react";

import Navbar from "../Components/Navbar/Navbar";
import styled from "styled-components";
import homeImage from "../assets/Homepage.jpg"; // Update the path based on your project structure
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
  padding: 0px 20px 20px 20px;
  

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Caption = styled.div`
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 30px;
    font-size: 1rem;
    background-color: #0B5ED7;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #256ad1;
  }
`;

const ImageContainer = styled.div`
  max-width: 40%;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 20px;
  }

  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const Home = () => {

  const navigate = useNavigate(); // Initialize navigate function
  
  return (
    <>
      <Navbar />
      <HomeContainer>
        <Caption>
          <h1>A Smarter Way to Connect, Learn, and Succeed!</h1>
          <p>NetGrow connects students to learn, grow, and succeed effortlessly.</p>
          <button onClick={() => navigate("/login")}>Start</button>
        </Caption>
        <ImageContainer>
          <img src={homeImage} alt="Meeting illustration" />
        </ImageContainer>
      </HomeContainer>
    </>
  );
};

export default Home;



