import React from "react";

let rid;
let uid;
let lrid;

class Lobby extends React.Component {
    constructor(){
        super();
        lrid = (window.location.search).split("&")[0]
        uid = (window.location.search).split("&")[1]
        rid = lrid.substring(1)
        console.log(rid, uid)
    }
    render(){
        return (
            <div>
                {rid}
                <br></br>
                <br></br>
                <br></br>
                {uid}
            </div>
        )
    }
}
export default Lobby;