import React from 'react';
import { instance } from "../stores/UserStore";
import SubmitButton from "./SubmitButton";

//Mock backend import for testing functionality
import BackEnd from "../mock/BackEnd";

class LogoutForm extends React.Component {

	doLogout(){
		try{
			console.log('login out');
			//TODO: Mock backend to logout the user
			
		} catch(err){

		}
	}

	render() {
		return (
			<div className="logoutForm">
				Welcome {instance.username}

				<SubmitButton 
				
					text={'Log out'}
					disabled={false}
					onClick={ () => this.doLogout() }

				/>

			</div>
		)
	}; 
}

export default LogoutForm;
