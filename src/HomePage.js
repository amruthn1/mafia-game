import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import nightwind from 'nightwind/helper';

class HomePage extends React.Component {
  state = {
    createTextValue: '             Username',
    joinTextValue: '             Username',
    joinLobbyID: '              Lobby ID'
  }
  constructor(props){
    super(props);
    this.render();
  }

  render(){
    return (
      <div className = "text-center bg-white">
        <br/>
        <h3 className = "text-5xl">Mafia</h3>
        <br/>
        <h1 className = "text-1xl">A game of deceit and breaking trust</h1>
        <br/>
        <Button className = "rounded-full" component = {Link} to = {"/createlobby?uid=" + this.state.createTextValue} id = "createLobby">Create Lobby</Button>
          <div id = "createtextfield">
              <input className = "outline-black focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-100" id = "createtextfielda" value = {this.state.createTextValue} onChange = {this.updateCreateTextField} onFocus = {this.handlePretextCreate} onBlur = {this.handlePretextCreate}></input>
          </div>
        <br></br>
        <Button className = "rounded-full" component = {Link} to = {"/joinlobby?uid=" + this.state.joinTextValue + "&" + this.state.joinLobbyID} id = "joinLobby">Join Lobby</Button>
          <div id = "jointextfield">
            <input className = "outline-black focus:outline-none focus:ring focus:border-blue-300" id = "jointextfielda" value = {this.state.joinTextValue} onChange = {this.updateJoinTextField} onFocus = {this.handlePretextJoinName} onBlur = {this.handlePretextJoinName}></input>
          </div>
          <br/>
          <div id = "lobbytextfield">
            <input className = "outline-black focus:outline-none focus:ring focus:border-blue-300" id = "lobbytextfielda" value = {this.state.joinLobbyID} onChange = {this.updateLobbyTextField} onFocus = {this.handlePretextJoinID} onBlur = {this.handlePretextJoinID}></input>
          </div>
          <br></br>
          <br></br>
          <button onClick={() => nightwind.toggle()}>Dark Mode</button>
      </div>
    )
  }
  updateJoinTextField = (text) => {
    this.setState({
      joinTextValue: text.target.value
    })  
  }
  updateLobbyTextField = (text) => {
    this.setState({
      joinLobbyID: text.target.value
    })  
  }
  updateCreateTextField = (text) => {
    this.setState({
      createTextValue: text.target.value
    })
  }
  handlePretextCreate = (e) => {
    if (this.state.createTextValue === "             Username") {
      this.setState({
        createTextValue: ""
      })
    } else if (this.state.createTextValue === "") {
      this.setState({
        createTextValue: "             Username"
      }) 
    }
  }
  handlePretextJoinName = (e) => {
    if (this.state.joinTextValue === "             Username") {
      this.setState({
        joinTextValue: ""
      })
    } else if (this.state.joinTextValue === "") {
      this.setState({
        joinTextValue: "             Username"
      }) 
    }
  }
  handlePretextJoinID = (e) => {
    if (this.state.joinLobbyID === "              Lobby ID") {
      this.setState({
        joinLobbyID: ""
      })
    } else if (this.state.joinLobbyID === "") {
      this.setState({
        joinLobbyID: "              Lobby ID"
      }) 
    }
  }
}

export default HomePage;