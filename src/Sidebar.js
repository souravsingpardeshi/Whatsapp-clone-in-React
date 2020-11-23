import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import db from "./firebase.js";
import {useStateValue} from "./StateProvider.js";
import SidebarChat from "./SidebarChat.js";
import {SearchOutlined} from "@material-ui/icons";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import {Avatar, IconButton} from "@material-ui/core";
function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{user}, dispatch] = useStateValue();
	useEffect(() => {
		const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => 
			setRooms(snapshot.docs.map((doc) => ({
				id:doc.id,
				data: doc.data(),
			})
			))
			); 
		return () => {
			unsubscribe();
		};
	}, []);	

	return (
		<div className="sidebar">
		<div className="sidebar__header">
		<Avatar src={user?.photoURL} />
		<div className="sidebar__headerRight">
		<IconButton>
		<DonutLargeIcon />
		</IconButton>
		<IconButton>
		<ChatIcon />
		</IconButton>
		<IconButton>
		<MoreVerticalIcon />
		</IconButton>
		</div>
		</div>
		<div className="sidebar__search">
		<div className="sidebar__searchContainer">
		<SearchOutlined />
		<input placeholder="Search or start new chat" typr="text" />
		</div>
		</div>
		<div className="sidebar__chats">
		<SidebarChat addNewChat />
		{rooms.map((room) => (
			<SidebarChat key={room.id} id={room.id}
			name={room.data.name} />
			))}
		</div>
		</div>
		);
}

export default Sidebar;