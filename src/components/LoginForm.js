import React from 'react';
import { instance } from "../stores/UserStore";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

//Mock backend import for testing functionality
import BackEnd from "../mock/BackEnd";

class LoginForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			buttonDisabled: false
		}
	}

	setInputValue(property, val){
		val = val.trim();
		//TODO: Check if username, if so check if that it is a valid email
		this.setState({
			[property]: val
		})
	}

	resetForm() {
		this.setState({
			username: '',
			password: '',
			buttonDisabled: ''
		})
	}

	doLogin(){
		try{
			//If username or password is missing, stop code from going forward
			if(!this.state.username || !this.state.password) return;
			
			this.setState({
				buttonDisabled: true
			})

			//Mock API call to login the user
			let res = BackEnd.login({
				method: 'POST',
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password
				})
			});

			//Parses string response back into JSON, just to demonstrate this would be needed if using proper API or websocket communication
			let result = JSON.parse(res);

			console.log('result', result);

			//Based on data received from mock API either set status for logged user or reset the form and show user what is wrong
			if(result && result.sucess){
				instance.isLoggedIn = true;
				instance.username = result.username;
			} else if( result && result.err ) {
				this.resetForm();
				//Todo: show user what is wrong
			}
		} catch(err){
			console.error(`Err occured LoginForm.doLogin:36 -- ${err}`);
		}
	}

	render() {
		return (
			<div className="loginForm">
				Přihlášení

				<InputField
					type='text'
					placeholder='Email'
					value={this.state.username ? this.state.username : ''}
					onChange={ (el) => this.setInputValue('username', el) }
				/>

				<InputField
					type='password'
					placeholder='Heslo'
					value={this.state.password ? this.state.password : ''}
					onChange={ (el) => this.setInputValue('password', el) }
				/>

				<SubmitButton 
					text={'Přihlásit'}
					disabled={false}
					onClick={ () => this.doLogin() }
				/>

			</div>
		)
	}; 
}

export default LoginForm;
