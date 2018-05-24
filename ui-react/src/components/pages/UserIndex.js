
import React from 'react'
import Layout from '../Layout'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'


import '../../css/userpage.css'

/*
	hocs
*/
import mustBeLoggedOut from '../hocs/mustBeLoggedOut'
import mustBeLoggedIn from '../hocs/mustBeLoggedIn'

/*
	Pages
*/
import LoginPage from './UserLogin'
import SignupPage from './UserSignup'
import HomePage from './UserHome'


import { connect } from 'react-redux'

import PropTypes from 'prop-types';


/*
	UserIndex acts as a wrapper for all the user pages: login, signup, home
*/
class UserIndex extends React.Component{

	render(){

		const { match, authSystem } = this.props


		return(

			<Layout authSystem={authSystem} >


					<Route exact path={`${match.url}/login`} 
						component={ withRouter(mustBeLoggedOut( LoginPage )) } 
						/>

					<Route exact path={`${match.url}/signup`} 
						component={ withRouter(mustBeLoggedOut( SignupPage )) } 
						/>
					
					<Route exact path={`${match.url}/home`} 
						component={withRouter(mustBeLoggedIn( HomePage ))}
						/>

			</Layout>

		)
	}
}

UserIndex.propTypes = {
	match: PropTypes.object.isRequired,
	authSystem: PropTypes.object.isRequired,
};

const mapStateToProps = ({authSystem}) => ({authSystem})

export default connect(mapStateToProps)(UserIndex);	
