import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Container = styled.div`

`

const Title = styled.h1`

`

const Header = styled.header`

`

const Button = styled.button`

`

class Rooms extends React.Component {
    constructor() {
        super();
        this.state = {
            currentRoom: "",
            currentDesc: "",
            rooms: [],
            
    }
}
    
    componentDidMount() {

        axios
            .get(`https://mud-adventures.herokuapp.com/api/rooms/`)
            .then(res => this.setState({...this.state, rooms:res.data}))
            .catch(err => console.log(err))
        
        this.start();
        this.move('s')
    }

    start = () => {
        const token = localStorage.getItem('token'); 
        axios({
            url: `https://mud-adventures.herokuapp.com/api/adv/init/`,
            
            method: "GET",
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                this.setState({ 
                    currentRoom: res.data.title,
                    userID: res.data.uuid,
                    currentDesc: res.data.description,
                    
                }); 

            })
            .catch(err => {
                console.log('errors', err.response)
            });        
    };

    move = (direction) => {
        const token = localStorage.getItem('token'); 
        axios({
            url: `https://mud-adventures.herokuapp.com/api/adv/move`,
            method: "POST",
            headers: {
                Authorization: token
            },
            data: {
                direction: direction
            }
        })
            .then(res => {
                this.setState({
                    currentRoom: res.data.title,
                    currentDesc: res.data.description,
                })
            })
            .catch(err => {
                console.log('errors', err.response)
            });
    };

    render(){
        console.log(this.state)
        return(
           <Container>
                <Header>
                Mud Adventure
                </Header>

                
                <div>
                    <Title> You are at the </Title>
                    <p>{this.state.currentRoom}</p>
                    <p>{this.state.currentDesc}</p>

                </div> 

                <div>
                    <Button type="button" onClick={() => this.move('n')}>North</Button>
                    <Button type="button" onClick={() => this.move('s')}>South</Button>
                    <Button type="button" onClick={() => this.move('e')}>East</Button>
                    <Button type="button" onClick={() => this.move('w')}>West</Button>
                </div>
            </Container>
        )
        
    }
};

export default Rooms;


