import React from "react";
import io from 'socket.io-client';
import Config from '../config.json'
let socket, temp, tempa, rid, sstorage = window.sessionStorage;;

class Game extends React.Component {
    constructor() {
        super();
        temp = (window.location.search).substring(1)
        tempa = atob(temp).split("@")
        console.log("running")
        rid = tempa[tempa.length - 1]
        tempa.splice(-1, 1)
        this.parseData()
    }
    render() {
        return (
            <div>Game</div>
        )
    }
    init() {
        socket = io(Config["server-url"], {
            'sync disconnect on unload': true
        })
        socket.on('connect', () => {
            console.log("generating roles", tempa)
            if (tempa[0] === sstorage.getItem('uid')) {
                socket.send(["movetoGame", tempa, rid])
            } else {
                console.log('alt')
            }
        })
    }
    generateRoles() {
        //socket.send(["generateRoles", tempa, rid])
    }
    parseData() {
        let t = tempa[0].split("<div>")[1]
        tempa[0] = t.split("<img")[0]
        for (let i = 0; i < tempa.length - 1; i++) {
            console.log("iterating")
            let y = tempa[i + 1].split("<div>")[1]
            tempa[i + 1] = y.split("</div>")[0]
        }
        console.log(rid, tempa)
        this.init()
    }
}
export default Game;
