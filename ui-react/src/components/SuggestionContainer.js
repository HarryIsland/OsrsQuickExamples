
import React from 'react'

// import CSSModules from 'react-css-modules';


import * as AppActions from '../actions'


import {  Icon, Divider, Popup, Dimmer, Loader } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AddNewComponent from './AddNewComponent'

import PropTypes from 'prop-types';




class SuggestionContainer extends React.Component{

	constructor(props){
		super(props)
		this.state ={
			/*
				Handles visibility of suggestion box
			*/
			open: false
		}
	}

	handleTriggerClick(){

		if(!this.state.open && this.props.suggestionBox.suggestions.length === 0){
			this.props.actions.fetchSuggestions()
		}

		this.setState({
			open: !this.state.open
		})
	}

	render(){

		const { open } = this.state
		const { actions, authSystem, suggestionBox } = this.props

		return(
			<div className='suggestion-container'>
				<OpenCloseButton onClick={this.handleTriggerClick.bind(this)} open={open} />
				
				<SuggestionBox open={open} suggestions={suggestionBox.suggestions} actions={actions} authSystem={authSystem}/> 
			</div>
		)
	}
}

SuggestionContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  authSystem: PropTypes.object.isRequired,
  suggestionBox: PropTypes.object.isRequired
};

const OpenCloseButton = ({onClick, open}) => (
	<button
		className={ open ? 'suggestion-trigger active' : 'suggestion-trigger'}
		onClick={onClick}> 

		{ !open && 'Open Community Suggestions'}

		{ open && 'Close Community Suggestions'}
	</button>
)	

OpenCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};



/*
	The content inside of suggestions box
*/
const SuggestionBox = ({open, suggestions, actions, authSystem }) => {

	function getClassName(){
		const classSTR = 'suggestion-box bordered-box-style2'
		return !open ? classSTR + ' hide' : classSTR
	}

	/*
		Loading suggestions
	*/
	if(suggestions.length === 0){
		return (
			<div className={getClassName()} > 
				<LoadingDimmer />
			</div>
		)
	}

	/*
		Everything loaded: display suggestions
	*/
	return (
		<div className={getClassName()} >
			<Title />
			<SuggestionRows actions={actions}  suggestions={suggestions}/>
			<AddNewComponent actions={actions} authSystem={authSystem} />
		</div>
	)
				
}

SuggestionBox.propTypes = {
	open: PropTypes.bool.isRequired,
	suggestions: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	authSystem: PropTypes.object.isRequired
};


const SuggestionRows = ({actions, suggestions}) => {

	return(
		<div className='suggestion-rows-wrapper'>

			{
				suggestions.map(s => (
					<React.Fragment key={s.username}>
						<SuggestionRow 
							key={s.username}
							isVotingInProgress={s.isVotingInProgress}
							isUpvoted={s.isUpvoted}
							isDownvoted={s.isDownvoted}
							vote={actions.vote}
							votes={s.upvotes - s.downvotes} actions={actions} name={s.username} />
						<Divider />
					</React.Fragment>
				) )
			}
	
		</div>
	)
}

SuggestionRows.propTypes = {
	suggestions: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
};

class SuggestionRow extends React.Component {

	handleClick(){
       	this.props.actions.fetchOrLoadCharacter({username:this.props.name,isFirstTimeSearch:false})
	}

	render(){

		const arrows = {
			votes: this.props.votes,
			name: this.props.name,
			vote: this.props.vote, 
			isUpvoted: this.props.isUpvoted,
			isDownvoted: this.props.isDownvoted,
			isVotingInProgress: this.props.isVotingInProgress
		}

		return(
			<div className='suggestion-row'>

				{
					/*
						You vote with these
					*/
				}
				<UpDownArrow {...arrows} />

				{
					/*
						Clicking on a name fetches this character
					*/
				}
				<div className='name-link' onClick={this.handleClick.bind(this)}>
					{this.props.name}
				</div>
			</div>
		)
		
	}
}

SuggestionRow.propTypes = {
	votes: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	/*
		Function used when clicked on an arrow
	*/
	vote: PropTypes.func.isRequired,
	/*
		isUpvoted, isDownvoted can be undefined if user has not clicked on them
	*/
	isUpvoted: PropTypes.bool,
	isDownvoted: PropTypes.bool,
	/*
		Undefined if voting is not in progress
	*/
	isVotingInProgress: PropTypes.bool,
};

const UpDownArrow = ({vote, isUpvoted, isDownvoted, votes, name, isVotingInProgress}) =>(
	<div className='arrows-wrapper'>

		<ArrowsLoadingDimmer active={isVotingInProgress} />
		
		<Arrow onClick={()=>{vote('up', name)}} active={isUpvoted} direction={'up'} />
		<span>{ votes }</span>
		<Arrow onClick={()=>{vote('down', name)}} active={isDownvoted} direction={'down'} />
		
	</div>
)

UpDownArrow.propTypes = {
	votes: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	/*
		Function used when clicked on an arrow
	*/
	vote: PropTypes.func.isRequired,
	/*
		isUpvoted, isDownvoted can be undefined if user has not clicked on them
	*/
	isUpvoted: PropTypes.bool,
	isDownvoted: PropTypes.bool,
	/*
		Undefined if voting is not in progress
	*/
	isVotingInProgress: PropTypes.bool,
};

const Arrow = ({onClick, active, direction}) => (

	<Icon 
		onClick={onClick} 
		size='large' 
		name={`chevron ${direction}`} 
		color={active ? 'orange' : undefined}
	 />

)

Arrow.propTypes = {
	/*
		Voting method
	*/
	onClick: PropTypes.func.isRequired,
	/*
		If user has voted up or down, undefined if no
	*/
	active: PropTypes.bool,
	direction:PropTypes.oneOf(['up', 'down']).isRequired
};

const ArrowsLoadingDimmer = ({active}) => (<Dimmer style={{background:'rgba(0,0,0,.1)'}} active={active}><Loader></Loader></Dimmer> )

ArrowsLoadingDimmer.propTypes = {
	active: PropTypes.bool,
};


const LoadingDimmer = () =>(
	<Dimmer style={{background:'rgba(0,0,0,.5)'}} active>
		<Loader>Loading</Loader>
	</Dimmer>	
)




const Title = () => (

	<div className='title-wrapper'>
		<p className='title'>Character Suggestions

		<span>
		    <Popup
		      trigger={<Icon name='question circle' />}
		      content='You can upvote/downvote, add new character names. '
		      size='tiny'
		    />
	    </span>

		</p>

	</div>

)

const mapStateToProps = ({suggestionBox, authSystem}) => {
 	return {
 		suggestionBox,
 		authSystem
 	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
})

export default connect(
	
	mapStateToProps,
	mapDispatchToProps
)(SuggestionContainer)

