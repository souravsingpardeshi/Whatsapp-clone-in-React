import React, {useEffect, useState} from "react";
import "./Chat.css";
import {useParams} from "react-router-dom";
import firebase from "firebase";
import db from "./firebase";
import {useStateValue} from "./StateProvider";
import {SearchOutlined} from "@material-ui/icons";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import {Avatar, IconButton} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
function Chat() {
	const [input, setInput] = useState("");
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState([]);
	const [{user}, dispatch] = useStateValue();
	useEffect(() => {
		if(roomId){
			db.collection("rooms").doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name)
				);

			db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [roomId]);
			
	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("rooms").doc(roomId).collection("messages").add({
			message:input,
			name:user.displayName,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput("");
	};
	return (
		<div className="chat">
		<div className="chat__header">
		<Avatar src={`https://avatars.dicebear.com/api/human/${(Math.floor(Math.random()*99999))}.svg`} />
		<div className="chat__headerInfo">
<h3>{roomName}</h3>
<p>last seen{" "}
{new Date(
	messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
</p>
</div>
<div className="chat__headerRight">
<IconButton>
		<SearchOutlined />
		</IconButton>
		<IconButton>
		<AttachFile />
		</IconButton>
		<IconButton>
		<MoreVerticalIcon />
		</IconButton>
</div>
		</div>
		<div className="chat__body">
		{messages.map(message => (
			<p className={`chat__meassage ${message.name === user.displayName && 'chat__receiver'}`}>
			<span className="chat__name">{message.name}</span>{message.message}
		<span className="chat__timestamp">
		{new Date(message.timestamp?.toDate()).toUTCString()}
		</span>
		</p>
			))}
		</div>
		<div className="chat__footer">
		<InsertEmoticonIcon />  
		<form>
		<input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
		<button onClick={sendMessage} type="submit">
		Send a message
		</button>
		</form>
		<MicIcon />
		</div>
		</div> 
		);
}

export default Chat;