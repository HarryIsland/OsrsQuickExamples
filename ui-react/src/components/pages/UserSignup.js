
import React from 'react'
import { Input, Button, Message } from 'semantic-ui-react'

/*
	Actions
*/
import * as AuthActions from '../../actions/authSystem'

/*
	Redux
*/
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { areSignupValuesOK, getSignupFormValues } from './utilities'

import PropTypes from 'prop-types';


class SignupPage extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			message : ''
		}
	}
	
	render(){

		return(
			<div className='user-form-wrapper'>

				<FeedbackMessage message={this.state.message} authSystem={this.props.authSystem} />

				<SignupForm onSubmit={this.handleSubmit.bind(this)} loading={this.props.authSystem.loadingIndicator} />

				<AlreadyHaveButton history={this.props.history} />

			</div>
		)
	}

	handleSubmit(event, b, c){
	
		const values = getSignupFormValues(event)

		if(areSignupValuesOK(values)){
			this.props.actions.signup(values)		
		}
		else{
			this.setState({
				message:'Make sure that inputs are at least 5 char long and passwords match!'
			})
		}

	}

}

SignupPage.propTypes = {
	history: PropTypes.object.isRequired,
	authSystem: PropTypes.object.isRequired,
};

const mapStateToProps = ({authSystem}) => ({authSystem})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupPage)



const AlreadyHaveButton = ({history}) => (
	<div className='button-wrapper'>
		<Button  onClick={()=> history.push('/user/login')} basic color='green' 
			content='Already Have An Account?' />
	</div>
)

const SignupForm = ({onSubmit, loading}) =>(
	<form onSubmit={onSubmit}>
		<Input name='username' icon='user' iconPosition='left' placeholder='Username' />
		<Input type='email' name='email' icon='at' iconPosition='left' placeholder='Email' />
		<Input type='password' name='password' icon='privacy' iconPosition='left' placeholder='Password' />
		<Input type='password' name='confirm_password' icon='privacy' iconPosition='left' placeholder='Confirm Password' />
		<div className='button-wrapper'>
			<Button loading={loading} color='green' content='SIGN UP' />
		</div>
	</form>	
)

const FeedbackMessage = ({message, authSystem}) =>{

	if(message.length > 0){
		return <Message negative>
			{ message }
		</Message>		
	}

	else if( authSystem.errorMessage && authSystem.errorMessage.length > 0 ){
		return <Message negative>
			{ authSystem.errorMessage }
		</Message>
	}

	else return null

}

