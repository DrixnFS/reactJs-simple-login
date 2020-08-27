import React from 'react';

class MailCheatsheet extends React.Component {

	render() {
		return (
			<div className="cheatsheet-container">
                <h6>Cheatsheet</h6>
                <h5>Příklady validního uživatelského jména:</h5>
                <h6>karel.capek@seznam.cz   heslo: 112233</h6>
                <h6>muj.mail@email.cz   heslo: abcd</h6>
                <h6>denis.postrach@post-bez-tld     heslo: 0000</h6>
                <h5>Příklady nevalidního uživatelského jména:</h5>
                <h6>toto@neni@validni</h6>
                <h6>Spatne@seznam.cz</h6>
                <h6>ty_neprojdes@post.cz</h6>
			</div>
		)
	}; 
}

export default MailCheatsheet;
