import React from "react";
import { Navigate } from 'react-router-dom'

let uid;
let temp;
let RID;
let reload = false;

class JoinLobby extends React.Component {
    state = {
        garb: false
    }
    constructor(){
        super()
        temp = ((window.location.search).split("=")[1])
        uid = temp.split("&")[0]
        RID = temp.split("&")[1]
        console.log("joinlobby", uid)
        this.joinLobby = this.joinLobby.bind(this)
        this.joinLobby();
    }
    componentWillMount(){
        this.joinLobby = this.joinLobby.bind(this)
    }
    render(){
        if (!reload) {
            return (
                <div>
                    <h3>Loading.....</h3>
                    <div>
                        <h3>{uid}</h3>
                        <br></br>
                        <h3>{RID}</h3>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Joining Lobby....</h3>
                    <div>
                        <h3>{uid}</h3>
                        <Navigate to = {"/lobby?" + RID + "&" + uid}></Navigate>
                    </div>
                </div>
            )
        } 
    }
    joinLobby(){
        reload = true;
        this.setState({garb: true})
    }
}
export default JoinLobby;