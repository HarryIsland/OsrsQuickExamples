	

import React from 'react'
import { Input, Button, Message } from 'semantic-ui-react'

/*
	Actions
*/
import * as AuthActions from '../../actions/authSystem'
import * as OtherActions from '../../actions'

/*
	Redux
*/
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { isLoginValuesValid, getLoginValues } from './utilities'

import PropTypes from 'prop-types';


class LoginPage extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			/*
				used for displaying info to the user
			*/
			message: ''
		}
	}

	/*
		In I was redirected from /beta, we need to close the loading popup
	*/
	componentDidMount(){
		this.props.otherActions.hideLoadingScreen()
	}

	render(){
		
		const { history } = this.props
		const { loadingIndicator } = this.props.authSystem

		return(
			<div className='user-form-wrapper'>

				<FeedbackMessage state={this.state} authSystem={this.props.authSystem} />
							
				<LoginForm loadingIndicator={loadingIndicator} handleSubmit={this.handleSubmit.bind(this)}/>

				<RegisterButton history={history} />
				
			</div>
		)
	}

	/*
		Handle form
	*/
	handleSubmit(event){

		const values = getLoginValues(event)

		if(isLoginValuesValid(values)){
			this.setState({
				message:''
			})			
			this.props.actions.login(values)
		}
		else{
			this.setState({
				message: `Must be at least 5 characters long`
			})			
		}

	}

}

LoginPage.propTypes = {
	/*
		To redirect to login
	*/
	history: PropTypes.object.isRequired,
	/*
		loading animation on the submit button
	*/
	loadingIndicator: PropTypes.bool,
	/*
		For checking if user is logged in
	*/
	authSystem: PropTypes.object.isRequired,
};

const FeedbackMessage = ({state, authSystem}) => {

	if(state.message.length > 0){
		return (		
			<Message negative>
				{state.message}
			</Message>	
		)
	}

	if(authSystem.failure){
		return <Message negative>
			Failed to log in, try again!
		</Message>
	}

	return null	
}

const RegisterButton = ({history}) => (
	<div className='button-wrapper'>
		<Button onClick={()=> history.push('/user/signup')} basic color='green' content='Register?' />
	</div>
)

const LoginForm = ({loadingIndicator, handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<Input name='username' icon='user' iconPosition='left' placeholder='Username' />
		<Input name='password' type='password' icon='privacy' iconPosition='left' placeholder='Password' />
		<div className='button-wrapper'>
			<Button loading={loadingIndicator} color='green' content='LOGIN' />
		</div>
	</form>
)


/*
	You can pass these through Router as well, but I think this is more readable.
*/

const mapStateToProps = ({authSystem}) => ({authSystem})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch),
  otherActions: bindActionCreators(OtherActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage)
