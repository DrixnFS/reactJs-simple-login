import React from 'react';

class InputField extends React.Component {

	render() {
		return (
			<input
				className='input'
				type={this.props.type}
				placeholder={this.props.placeholder}
				value={this.props.value}
				onChange={ (e) => this.props.onChange(e.target.value) }
			/>
		)
	}; 
}

export default InputField;
