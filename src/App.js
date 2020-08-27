import React from 'react';
import { observer } from 'mobx-react';
import { instance } from "./stores/UserStore";
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import './App.min.css';

//Mock backend import for testing functionality
import BackEnd from "./mock/BackEnd";

class App extends React.Component {

	componentDidMount(){
		try{
			//Check the mock api if the user is logged in session, for this showcase it will never happen as no session storage is present
			let res = BackEnd.isLoggedIn({
				method: "POST",
				body:JSON.stringify({
					token: "some-kind-of-token-of-logged-user"
				})
			});

			//Parses string response back into JSON, just to demonstrate this would be needed if using proper API or websocket communication
			let result = JSON.parse(res);

			if(result && result.sucess){
				instance.loading = false;
				instance.isLoggedIn = true;
				instance.username = result.username;
			} else {
				instance.loading = false;
				instance.isLoggedIn = false;
			}

		} catch(err){
			instance.loading = false;
			instance.isLoggedIn = false;
			console.error(`Err occured APP.componentDidMount:13 -- ${err}`);
		}
	}

	render() {
		//loading screen when user waits for response
		if(instance.loading){
			return (
				<div className="app">
					<div className="container">
						Nahrávám, prosím čekejte...
					</div>
				</div>
			)
		} else {
			//Users isnt login, showing login form
			if(!instance.isLoggedIn){
				return (
					<div className="app">
						<div className="container">

							<LoginForm />

						</div>
					</div>
				)
			} else {
				//User is logged in, showing logout form
				return (
					<div className="app">
						<div className="container">

							<LogoutForm />

						</div>
					</div>
				)
			}
		}
	}; 
}

export default observer(App);
