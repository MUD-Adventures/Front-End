import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import compass from './compass.svg'


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
justify-content: flex-end;
`

const Row = styled.div`
display: flex;
width: 100%;
flex-wrap: no-wrap;
`

const Room = styled.div`
width: 10%;
border: 1px solid yellow;
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
            currentRoom: "",
            currentDesc: "",
            rooms: null,
            
    }
}
    
    componentDidMount() {

        this.start();
        this.move('s')

        axios
            .get(`https://mud-adventures.herokuapp.com/api/rooms/`)
            .then(res => this.setState({...this.state, rooms:res.data}))
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

    getIds = () => {
        const ids=[]
        for (let i=0; i<this.state.rooms.length;i++) {
            ids[i] = this.state.rooms[i].id
        }
        return ids
    }


    render(){


        
        return(
           <Container>

               <World> 
                    <Title> You are at the {this.state.currentRoom}</Title>
                    
                    {!this.state.rooms && <p>Loading data.... </p>}
                    {this.state.rooms && (
                        <WorldMap>
                            
                            <FirstRow>
                                <Room id={this.getIds()[101]}>{this.getIds()[101]}</Room>
                            </FirstRow>
                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 95<id && id<106)     
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>
                            
                
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 85<id && id<96)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>
                            
                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 75<id && id<86)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 65<id && id<76)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 55<id && id<66)     
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 45<id && id<56)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 35<id && id<46)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 25<id && id<36)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 15<id && id<26)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            <Row>
                            {
                                this.getIds()
                                .filter(id => 5<id && id<16)
                                .map(id => <Room id={id}>{id}</Room>)
                            }
                            </Row>

                            
                            <Row>
                                <Room id={this.getIds()[100]}>{this.getIds()[100]}</Room>
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


