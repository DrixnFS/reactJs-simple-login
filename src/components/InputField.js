import React from 'react';

class InputField extends React.Component {

	render() {
		return (
			<div className="input-container">
				<input
					className={`inp-rounded ${this.props.err ? 'has-error' : null}`}
					type={this.props.type}
					placeholder={this.props.placeholder}
					value={this.props.value}
					onChange={ (e) => this.props.onChange(e.target.value) }
				/>
			</div>
		)
	}; 
}

export default InputField;
