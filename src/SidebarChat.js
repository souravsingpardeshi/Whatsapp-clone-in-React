import React, {useEffect, useState} from "react";
import {Avatar} from "@material-ui/core";
import db from "./firebase.js";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
function SidebarChat({id, name, addNewChat}) {
const [messages, setMessages] = useState("");
const [seed, setSeed] = useState('');	
useEffect(() => {
if(id){
	db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => (
				setMessages(snapshot.docs.map((doc) => doc.data()))
		));
}
}, [id])
useEffect(() => { 
	setSeed(Math.floor(Math.random()*9999));
}, []);
const createChat = () => {
	const roomName = prompt("Please enter a rom name for chat");
	if(roomName) {
		db.collection("rooms").add({
			name: roomName,
		});
	}
};
	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
		<div className="sidebarChat">
		<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
		<div className="sidebarChat__info">
		<h2>{name}</h2>
		<p>{messages[0]?.message}</p>
		</div>
		</div>
		</Link>
		):(
		<div onClick={createChat} className="sidebarChat">
		<h3>Add New Chat</h3>
		</div>
		);

}
export default SidebarChat;