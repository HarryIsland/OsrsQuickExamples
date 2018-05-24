
import React from 'react'

import { Button, Icon, Input } from 'semantic-ui-react'

import PropTypes from 'prop-types';

export default class AddNewComponent extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			formVisible: false
		}
	}

	hideShowFrom(){

		if(!this.props.authSystem.authUser){
			this.props.actions.showPopup('must_be_logged_in_to_add_suggestions')
		}
		else{
			this.setState({
				formVisible: !this.state.formVisible
			})
		}

	}

	onSubmit(e){
		/*
			Form submit
		*/
		e.preventDefault()

		this.props.actions.submitSuggestion({characterName:this.inputRef.inputRef.value})

		/*
			Close form
		*/
		this.setState({
			formVisible:false
		})

	}

	render(){
		const { formVisible } = this.state
		return (
			<div className='add-new-wrapper'>

				{!formVisible &&
					<AddButton onClick={this.hideShowFrom.bind(this)} />
				}

				{
					formVisible && 
					<AddForm 
					inputRef={ref => this.inputRef = ref}
					onSubmit={this.onSubmit.bind(this)} />
				}
			</div>
		)	
	}
}


AddNewComponent.propTypes = {
	actions: PropTypes.object.isRequired,
	authSystem: PropTypes.object.isRequired,
};

const AddForm = ({onSubmit, inputRef}) =>(
	<form onSubmit={onSubmit} >
		<Input 
		ref={inputRef}
		name='username' icon='add user' iconPosition='left' placeholder={`Character's name`} />
		<div className='button-wrapper'>
			<Button 
				primary
			>
				Submit
			</Button>
		</div>
	</form>

)

AddForm.propTypes = {
	/*
		Submit form
	*/
	onSubmit: PropTypes.func.isRequired,
	/*
		We get a character name using that
	*/
	inputRef: PropTypes.func.isRequired
};


const AddButton = ({onClick}) =>(
	<Button 
		onClick={onClick}
		size='tiny'
		icon
		labelPosition='right'
		className='add-new'>
		
		<Icon name='add user'/>
		 Add New
	</Button>
)

AddButton.propTypes = {
	/*
		Hides/shows form
	*/
	onClick: PropTypes.func.isRequired,
};
