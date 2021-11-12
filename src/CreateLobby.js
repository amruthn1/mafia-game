import React from "react";
import io from 'socket.io-client';
import { Navigate } from 'react-router-dom'

let uid;
let socket;
let gotRID = false;
let ndata = '';

class CreateLobby extends React.Component {
    state = {
        reload: false
    }
    constructor(){
        super()
        uid = ((window.location.search).split("=")[1])
        console.log("createlobby", uid)
        this.createLobby();
    }
    render(){
        if (!gotRID) {
            return (
                <div>
                    <h3>Loading.....</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <Navigate to = {"/lobby?" + ndata + "&" + uid}></Navigate>
                    </div>
                </div>
            )
        } 
    }
    createLobby(){
        socket = io("ws://localhost:8000") 
        socket.on("connect", () => {
            socket.send(["createLobby", socket.id])
            socket.onAny(data => {
                if (data !== null) {
                    console.log(data) //lobbyid
                    socket.emit('end')
                    gotRID = true;
                    ndata = data;
                    this.setState({reload: true});
                }
            })
        })
    }
}
export default CreateLobby;