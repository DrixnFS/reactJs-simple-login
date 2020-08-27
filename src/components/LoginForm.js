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
			responseError: '',
			buttonDisabled: false
		}
		this.serverErrors = {
			'password-bad' : 'Zadáno špatné heslo',
			'user-unknown' : 'Neexistující uživatel',
			'param-missing': 'Chybějící jméno či heslo',
			'method-not-supported': 'Metoda nepovolena, využívejte pouze POST',
			'arg-missing': 'Server neobdržel request objekt'
		}
		this.inputErrors = {
			'name-short' : 'Jméno před @ musí obsahovat alespoň 5 znaků',
			'name-multiple-at-sign': 'E-mail musí obsahovat jeden @',
			'name-not-allowed-letters': 'E-mail obsahuje nepovolené znaky, povolené jsou . a -',
			'name-no-domain' : 'E-mail musí mít doménu za @',
			'password-empty': 'Heslo nemůže být prázné'
		}
	}

	/**
	 * Updates value of property in component on change in the input
	 * @param {String} property - Property in state of this component
	 * @param {String} val - Value received from inputs
	 */
	setInputValue(property, val){
		val = val.trim();

		this.setState({
			[property]: val
		})
	}

	/**
	 * Validates the form if the data typed in every input are good to be send to server
	 * if data arent valid, shows error to client what exactly is wrong
	 */
	validateForm(){
		//Resets all the errors before validating again
		this.resetInputErrors();

		//Check if username is valid based on regex specified
		let usernameValid = this._validateInput('username', this.state.username);
		//if username isnt valid, check what is the problem
		if(!usernameValid){
			var value = this.state.username;
			//Check if the name before @ is atleast 5 characters long
			if(!RegExp('^[a-z\.|\-]{5,}').test(value)) return this._showErr('username', 'name-short');
			//Check there are no unallowed characters in the username
			if(!RegExp('^[a-z\.|\-|\@]+$').test(value)) return this._showErr('username', 'name-not-allowed-letters');
			//Check if there is only 1 at-sign in the username
			if(!RegExp('^[a-z\.|\-]{5,}@{1}[a-z\.|-]{0,}$').test(value)) return this._showErr('username', 'name-multiple-at-sign');
			//Check if username has any domain
			if(!RegExp('^[a-z\.|\-]{5,}@[a-z\.|-]+$').test(value)) return this._showErr('username', 'name-no-domain');
		}

		//Check if password is valid
		let passwordValid = this._validateInput('password', this.state.password);
		//If password isnt valid, show error as only reason why isnt valid is its empty
		if(!passwordValid) return this._showErr('password', 'password-empty');

		return true;
	}

	/**
	 * Resets error states and messages for inputs in the form
	 */
	resetInputErrors(){
		this.setState({
			usernameError: '',
			passwordError: ''
		})
	}

	/**
	 * Validates input values to pre-set regexes to check if input's value is valid
	 * @param {String} name - name of property, input, that this fce is supposed to validate
	 * @param {String} val - Value to be validated against pre-set regexes
	 */
	_validateInput(name, val){
		var regex = null;

		switch(name){
			case 'username':
				//Check if every character is lowercase, has only . or - the name before @ is atleast 5 characters long and has only 1 @
				regex = RegExp('^[a-z\.|\-]{5,}@[a-z\.|-]+$');
			break;
			case 'password':
				//Check if password is not empty
				regex = RegExp('^.+$');
			break;
			default:
				console.warn('Unsupported validating');
			break;
		}

		return regex ? regex.test(val) : false;
	}

	/**
	 * Shows error state and error message for specific input
	 * @param {String} name - name of property, input, that this fce is supposed to show error to
	 * @param {String} type - value of error type to be displayed
	 */
	_showErr(name, type){
		if(!name){
			return;
		}
		let property = `${name}Error`;
		this.setState({
			[property]: this.inputErrors[type]
		})
	}

	/**
	 * Resets form to its default state
	 */
	resetForm() {
		this.setState({
			username: '',
			password: '',
			usernameError: '',
			passwordError: '',
			buttonDisabled: ''
		})
	}

	/**
	 * callback function for login the user in
	 */
	doLogin(){
		try{
			// Validate form inputs, if not valid stop code from going forward
			let isFormValid = this.validateForm();
			if(!isFormValid) return;
			
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

			//Based on data received from mock API either set status for logged user or reset the form and show user what is wrong
			if(result && result.success){
				instance.isLoggedIn = true;
				instance.username = result.username;
			} else if( result && result.err ) {
				this.resetForm();
				this.setState({
					responseError : this.serverErrors[result.msg]
				})
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
