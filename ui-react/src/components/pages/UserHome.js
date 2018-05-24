

import React from 'react'
import {  Button, Label, Table } from 'semantic-ui-react'

/*
	Actions
*/
import * as AuthActions from '../../actions/authSystem'

/*
	Redux
*/
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment'

import PropTypes from 'prop-types';

class HomePage extends React.Component{

	render(){
	
		return(
			<div className='user-home'>
				<Left>
					<UserInfo user={this.props.authUser.user} />
					<Features actions={this.props.actions} />
				</Left>
				<Right>
					<FeaturesTable />
				</Right>
			</div>
		)
	}

}

HomePage.propTypes = {
	authUser: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

const mapStateToProps = ({authSystem}) => ({...authSystem})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage)



const Left =  ({children}) => <div className='left-side'>{children}</div>

const Right =  ({children}) => <div className='right-side'>{children}</div>

const FeaturesTable = () => {

	const rows = [
		[
			'Create', 
			'You can create new suggestions',
			<Released/> 
		],
		[
			'Voting', 
			'You can vote for suggestions',
			<Released/> 
		],
		[
			'Default selection', 
			'You can set default character selections',
			<Upcoming/> 
		],
		[
			'Default chart', 
			'You can set default chart settings',
			<Upcoming/> 
		],
		[
			'Rename', 
			"You can rename RS character's name, so that our tracked data transfers",
			<Upcoming/> 
		]

	]

	return <FeaturesText rows={rows} />

}


const FeaturesText = ({rows}) => (
	<div>
		<h3>Private features for you:</h3>

		<Table celled padded inverted>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Feature</Table.HeaderCell>
					<Table.HeaderCell>Comment</Table.HeaderCell>
					<Table.HeaderCell>Access</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>

				{rows.map( (row, index) => <TableRow key={index} cells={row} />	)}

			</Table.Body>
		</Table>



	</div>
)

const TableRow = ({cells}) => (
	<Table.Row>
		<Table.Cell>{cells[0]}</Table.Cell>
		<Table.Cell>{cells[1]}</Table.Cell>
		<Table.Cell>{cells[2]}</Table.Cell>					
	</Table.Row>	
)

const Released = () => <Label color='green' horizontal>Released</Label> 
const Upcoming = () => <Label color='orange' horizontal>Upcoming</Label>


const UserInfo = ({user}) =>(
	<div className='userpage-userinfo-block'>
		<Info label='Username' data={user.username} />
		<Info label='Email' data={user.email} />
		<Info label='Created at' data={moment(user.created_at).format('MMM DD, YYYY')} />
	</div>
)

const Info = ({label, data}) => (
	<div className='userinfo-row'>
		<div>{label}</div>
		<div>{data}</div>
	</div>
)

const Features = ({actions}) => (
	<div className='userpage-features-block'>

		<Button negative onClick={() => actions.logout() } >Log out</Button>
	</div>
)

