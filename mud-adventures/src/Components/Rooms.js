import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import compass from './compass.svg'
import Room from './Room'


const Container = styled.div`
width: 87rem;
height: 41rem;
border-radius: 8px;
display: flex;
flex-direction: row;
`

const Title = styled.h1`
width: 50rem;
font-size: 39px;
color: white;
margin-left: 2rem;
`

const World = styled.div`
font-size: 19px;
color: green;
`

const WorldMap = styled.div`
display: flex;
flex-wrap: wrap;
height: 28rem;
width: 65rem;
border: 2px solid green;
border-radius: 25px;
margin: 1rem;
`
const FirstRow = styled.div`
display: flex;
width: 100%;
height: 8.3%;
justify-content: flex-end;
`

const Row = styled.div`
display: flex;
height: 8.3%;
width: 100%;
flex-wrap: no-wrap;
`



const Desc = styled.header`
width: 55rem;
margin-left: 2rem;
font-size: 19px;
color: white;
`

const Compass = styled.img`
height: 6rem;
margin: 1rem;
`

const CompassBox = styled.div`
width: 14rem;
height: 14rem;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 15rem;
margin-left: 3rem;

`

const MiddleRow = styled.div`
display: flex;
flex-direction: row;
align-items: center;

`

const Button = styled.button`
background: black;
color: red;
border-radius: 25px;
border: 2px solid red;
outline: none;



:hover {
  color: green;
  cursor: pointer;
  border: 2px solid green;
}


`

class Rooms extends React.Component {
    constructor() {
        super();
        this.state = {
            playerRoom: null,
            currentRoomTitle: "",
            currentDesc: "",
            rooms: null,
    }
}
    
    componentDidMount() {

        this.start();
        this.move('s')

        axios
            .get(`https://mud-adventures.herokuapp.com/api/rooms/`)
            .then(res => this.setState({...this.state, rooms:res.data, playerRoom:res.data[100]}))
            .catch(err => console.log(err))
        
        
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
                    currentRoomTitle: res.data.title,
                    userID: res.data.uuid,
                    currentDesc: res.data.description,
                    
                }); 

            })
            .catch(err => {
                console.log('errors', err.response)
            });        
    };

    move = (direction) => {

        const directions={'n':'n_to', 's':'s_to', 'e':'e_to', 'w':'w_to'}

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
                    currentRoomTitle: res.data.title,
                    currentDesc: res.data.description,
                })
                console.log(this.state.playerRoom)
                let formattedDirection = directions[direction]
                console.log(formattedDirection)
                console.log(": ", this.state.playerRoom[formattedDirection])
                let nextRoomId = this.state.playerRoom[formattedDirection]
                if( nextRoomId !== 0) {

                    let nextRoom = this.state.rooms.find(room => room.id === nextRoomId)
                    console.log(nextRoom)
                    this.setState({...this.state, playerRoom: nextRoom})

                }

            })
            .catch(err => {
                console.log('errors', err.response)
            });
    };

    render(){

        
       
        return(
           <Container>

               <World> 
                    <Title> You are at the {this.state.currentRoomTitle}</Title>
                    
                    {!this.state.rooms && <p>Loading data.... </p>}
                    {this.state.rooms && (
                        
                        <WorldMap>
                            
                            <FirstRow>
                                <Room room={this.state.rooms[101]} playerRoom={this.state.playerRoom}></Room>
                            </FirstRow>
                            
                            <Row>
                            {
                                this.state.rooms
                                    .filter(room => 95<room.id && room.id<106)     
                                    .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>
                            
                
                            <Row>
                            {
                                this.state.rooms.filter(room => 85<room.id && room.id<96)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>
                            
                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 75<room.id && room.id<86)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 65<room.id && room.id<76)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 55<room.id && room.id<66)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 45<room.id && room.id<56)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>

                            
                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 35<room.id && room.id<46)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 25<room.id && room.id<36)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 15<room.id && room.id<26)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.state.rooms.filter(room => 5<room.id && room.id<16)     
                                .map( room => <Room key={room.id} room={room} playerRoom={this.state.playerRoom}></Room>)
                            } 
                            </Row>

                            
                            <Row>
                                <Room room={this.state.rooms[100]} playerRoom={this.state.playerRoom}></Room>
                            </Row>

  
                         </WorldMap>
                    )}

                    
                        
                    <Desc>{this.state.currentDesc}</Desc>
                </World> 

                <CompassBox>
                    <Button type="button" onClick={() => this.move('n')}>North</Button>

                    <MiddleRow>
                        <Button type="button" onClick={() => this.move('w')}>West</Button>
                        <Compass src={compass} alt="compass" />
                        <Button type="button" onClick={() => this.move('e')}>East</Button>
                    </MiddleRow>


                    <Button type="button" onClick={() => this.move('s')}>South</Button>
                </CompassBox>

            </Container>
        )
        
    }
};

export default Rooms;


