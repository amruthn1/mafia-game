import React from "react";
import io from 'socket.io-client';

let rid;
let uid;
let lrid;
let aplyrs = [];
let socket;

class Lobby extends React.Component {
    constructor() {
        super()
        this.init();
        this.inLobby();
    }
    render() {
        return (
            <div>
                {rid}
                <br></br>
                <br></br>
                <br></br>
                <ul>
                    {aplyrs.map((msg) => <h3 key = {aplyrs.indexOf(msg)}>{msg}</h3>)}
                </ul>
            </div>
        )
    }
    inLobby(){
        socket = io('ws://localhost:8000')
        socket.on('connect', () => {
            console.log("connected")
            socket.send(["inLobby", rid, uid])
            socket.onAny((data) => {
                console.log(data)
                if (data.split("//")[1] !== uid) {
                    aplyrs.push(data.split("//")[1])
                    this.forceUpdate()
                }
            })        
        })
    }
    init(){
        lrid = (window.location.search).split("&")[0]
        uid = (window.location.search).split("&")[1]
        rid = lrid.substring(1)
        aplyrs.push(uid)
        console.log(rid, uid)
    }
}
export default Lobby;