import React from "react";
import "./Login.css";
import {actionTypes} from "./reducer";
import {auth,provider} from "./firebase.js";
import {Button} from "@material-ui/core";
import {useStateValue} from "./StateProvider";
function Login() {
	const [{user}, dispatch] = useStateValue();
	const signIn = () => {
		auth.signInWithPopup(provider).then((result) => {
			dispatch({
				type: actionTypes.SET_USER,
				user: result.user,
			})
		});
	};
	return (
		<div className="login">
		<div className="login__container">
		<img className="login__logo" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="" />
		<div className="login__text">
		<h1>Sign in to WhatsApp</h1>
		</div>
		<Button onClick={signIn}>
		Sign In With Google
		</Button>
		<h3>Made with Love🖤 By Souravsing...</h3>
		</div>
		</div>
		);

}

export default Login;