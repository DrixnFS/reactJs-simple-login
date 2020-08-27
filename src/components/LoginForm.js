import React from 'react';
import { instance } from "../stores/UserStore";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

//Mock backend import for testing functionality
import BackEnd from "../mock/BackEnd";

//Cheatsheet for input entries
import Cheatsheet from "./MailCheatsheet";

class LoginForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			usernameError: '',
			passwordError: '',
			buttonDisabled: false
		}
	}

	setInputValue(property, val){
		val = val.trim();
		let isValid = this._validateInput(property, val);
		if(!isValid) {
			this._showErr(property);
			return;
		}

		this.setState({
			[property]: val
		})
	}

	_validateInput(name, val){
		//TODO: RegEx validation for inputs and values
		return true;
	}

	_showErr(name){
		//TODO: set proper errors for specific inputs
	}

	resetForm() {
		this.setState({
			username: '',
			password: '',
			usernameError: '',
			passwordError: '',
			responseError: '',
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

			console.log(result);

			//Based on data received from mock API either set status for logged user or reset the form and show user what is wrong
			if(result && result.success){
				instance.isLoggedIn = true;
				instance.username = result.username;
			} else if( result && result.err ) {
				this.resetForm();
				//TODO: server response error handling, separate message box not gonna affect inputs
			}
		} catch(err){
			console.error(`Err occured LoginForm.doLogin:36 -- ${err}`);
		}
	}

	render() {
		return (
			<form className="loginForm" action="#">

				<InputField
					type='text'
					placeholder='E-mailová adresa'
					value={this.state.username ? this.state.username : ''}
					onChange={ (el) => this.setInputValue('username', el) }
					err={this.state.usernameError}
				/>
				<small className="sml-error">&#8203; {this.state.usernameError}</small>

				<InputField
					type='password'
					placeholder='Heslo'
					value={this.state.password ? this.state.password : ''}
					onChange={ (el) => this.setInputValue('password', el) }
					err={this.state.passwordError}
				/>
				<small className="sml-error">&#8203; {this.state.passwordError}</small>

				<SubmitButton 
					text={'Přihlásit se'}
					disabled={false}
					onClick={ () => this.doLogin() }
				/>

				<h4 className="res-error">&#8203; {this.state.responseError}</h4>

				<Cheatsheet />

			</form>
		)
	}; 
}

export default LoginForm;
