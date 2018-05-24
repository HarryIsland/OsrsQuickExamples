import React from 'react'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom';

/*
	This HOC is used for UserHome , if a user is not logged in, then we redirect him to UserLogin
*/
const mustBeLoggedIn = (WrappedComponent) =>{

	class Authentication extends React.Component{
	
	    render() {
	    
	    	if(this.props.authSystem.authUser === null){
	    		return <Redirect to='/user/login' />
	    	}
	    	else return <WrappedComponent {...this.props} />

	    }			
	}

	const mapStateToProps = ({authSystem}) => ({authSystem})

	return connect(mapStateToProps)(Authentication);	

}

export default mustBeLoggedIn