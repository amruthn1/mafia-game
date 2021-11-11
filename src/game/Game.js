import React from "react";
import io from 'socket.io-client';

let socket, temp, tempa, rid;

class Game extends React.Component {
    constructor(){
        super();
        temp = (window.location.search).substring(1)
        tempa = atob(temp).split("@")
        rid = tempa[tempa.length - 1]
        tempa.splice(-1, 1)
        console.log(tempa)
        this.init()
    }
    render(){
        return(
            <div>Game</div>
        )
    }
    init(){
        socket = io('ws://localhost:8000', {
            'sync disconnect on unload': true })
            socket.on('connect', () => {
                console.log("generating roles")
                socket.send(["movetoGame", tempa, rid])
            })
    }
    generateRoles(){
        socket.send(["generateRoles", tempa, rid])
    }
}
export default Game;
