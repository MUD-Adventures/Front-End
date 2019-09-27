import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'


const Container = styled.div`
width: 30rem;
height: 16rem;
display: flex;
flex-direction: column;
align-items: center;
margin-left: 28rem;
margin-top: 5rem;
border: 2px solid green;
border-radius: 25px;
`

const Header = styled.div`


color: white;

`

const Title = styled.h1`

color: white;

`

const LoginPrompt = styled.span`
display: flex;
flex-direction: column;
align-items: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
color: white;

`

const Username = styled.input`
margin: 5px;
border: 2px solid green;
border-radius: 5px;
padding: 5px;
`

const Password = styled.input`
margin: 5px;
border: 2px solid green;
border-radius: 5px;
padding: 5px;
`

const Button = styled.button`
background: black;
color: red;
border-radius: 25px;
border: 2px solid red;
width: 100px;



:hover {
  color: green;
  cursor: pointer;
  border: 2px solid green;
}
`

const SignUp = styled.div`


color: white;

`



export default function Login(props) {
    const [user, setUser] = useState({ username: "", password: "" })

    function inputHandler(event) {
        const updatedUser = { ...user, [event.target.name]: event.target.value };
        setUser(updatedUser);
      }
      
    function submitHandler(event) {
        event.preventDefault();
        axios.post(`https://mud-adventures.herokuapp.com/api/login/`, user)
          .then(res => {
            if (res.status === 200 && res.data) {
              const token = res.data.key
              localStorage.setItem('token', `Token ${token}`)
              props.history.push('/rooms')
            }
          })
          .catch(err => {
            if (err) console.log(err)
          })
        }  

        return (
              <Container>

                    <Header>
                      <Title>MUD Adventure!</Title>
                        <LoginPrompt>Please Login</LoginPrompt>
                    </Header>

                    <Form onSubmit={submitHandler}>

                      <Username 
                          type="text"
                          id="username" 
                          name="username" required
                          placeholder="username"
                          value={user.username}
                          onChange={inputHandler}
                          />
                      
                      <Password 
                          type="password"
                          id="password" 
                          name="password" required 
                          placeholder="password"
                          value={user.password}
                          onChange={inputHandler}
                          />

                      <Button type="submit">Submit</Button>

                    </Form>

                      <SignUp> or Sign up <Link to = '/register'> Here </Link></SignUp>
                
              </Container>
            );
          }

