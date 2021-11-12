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
                </div>
            )
        } else {
            return (
                <div>
                    <div>
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