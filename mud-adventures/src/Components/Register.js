import React, { useState }from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
color: white;
`
const Title = styled.h1`

`

const Button = styled.button`
background: black;
color: red;
border-radius: 25px;
border: 2px solid red;
width: 100px;
outline: none;



:hover {
  color: green;
  cursor: pointer;
  border: 2px solid green;
}
`
const Input = styled.div`

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

const Password2 = styled.input`
margin: 5px;
border: 2px solid green;
border-radius: 5px;
padding: 5px;
`

const Container = styled.div`
width: 30rem;
height: 18rem;
display: flex;
flex-direction: column;
align-items: center;
margin-left: 28rem;
margin-top: 5rem;
border: 2px solid green;
border-radius: 25px;
`

const SignUp = styled.div`
margin: 1rem;
color: white;
`

const Register = (props) => {

    const [inputs, setInputs] = useState({ password1:'', password2:'', username: ''});

    const registerUser = (newUser) => {
        axios.post(`https://mud-adventures.herokuapp.com/api/registration/`, newUser)
        .then(res => {
          console.log('response', res)
          const token = res.data.key
          localStorage.setItem('token', `Token ${token}`)
          props.history.push('/')
        })
        .catch(error => {
          console.log('ERROR', error.response)
        })
      }

    const handleSubmit = (event) => {
        console.log('UserState: ', inputs)
        if (event) {
            event.preventDefault();
         registerUser(inputs);     
        }
     
    }

    const handleChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name] : event.target.value }))
    }

      
    return (
        <Container>
        <Form onSubmit = {handleSubmit}>
            <Title>Create an Account</Title>
            
           <div>
   
            <Input>
                <Username 
                placeholder="Username"
                type = 'username' 
                name = 'username' 
                onChange = {handleChange} 
                value = {inputs.username} required
                />
            </Input>

            <Input>
                <Password                   
                placeholder="password"
                type = 'password1' 
                name = 'password1' 
                onChange = {handleChange} 
                value = {inputs.password1} required
                />
            </Input>
            <Input>

                <Password2                   
                placeholder="confirm password"
                type = 'password2' 
                name = 'password2' 
                onChange = {handleChange} 
                value = {inputs.password2} required
                />
            </Input>

            </div>
            <Button type = 'submit' >Sign Up</Button>
        </Form>


        <SignUp>Already Sign Up? <Link to = '/'>Login Here</Link></SignUp>
        </Container>
    )
}

export default Register;




