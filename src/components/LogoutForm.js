import React from 'react';
import { instance } from "../stores/UserStore";
import SubmitButton from "./SubmitButton";

//Mock backend import for testing functionality
import BackEnd from "../mock/BackEnd";

class LogoutForm extends React.Component {

	/**
	 * callback function for login the user out of the application
	 */
	doLogout(){
		try{
			//Mock API call to logout the user
			let res = BackEnd.logout({
				method: 'POST',
				body: JSON.stringify({
					token: "some-kind-of-token-of-logged-user"
				})
			});
			
			//Parses string response back into JSON, just to demonstrate this would be needed if using proper API or websocket communication
			let result = JSON.parse(res);

			//Based on data received from mock API either set status to not logged or show error why it couldnt logout
			if(result && result.success){
				instance.isLoggedIn = false;
				instance.username = '';
			} else if( result && result.err ) {
				//If there was some issues with logging user out, for example he wasnt really logged in, probably hacked, or session storage already removed him error will be set here
			}
		} catch(err){
			console.error(`Err occured LoginForm.doLogout:10 -- ${err}`);
		}
	}

	render() {
		return (
			<form className="logoutForm" action="#">
				Vítejte,  {instance.username}

				<SubmitButton 
				
					text={'Odhlásit se'}
					disabled={false}
					onClick={ () => this.doLogout() }

				/>

			</form>
		)
	}; 
}

export default LogoutForm;
