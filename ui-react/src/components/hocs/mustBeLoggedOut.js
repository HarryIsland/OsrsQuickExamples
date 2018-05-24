import React from 'react'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom';


/*
	If user is logged in, we redirect the user to UserHome, there he can log himself out

	We use this HOC for signup page and login page, which clearly have no use, unless user is logged out.

*/
const mustBeLoggedOut = (WrappedComponent) =>{

	class Authentication extends React.Component{
	    
	    render() {
	    
	    	if(this.props.authSystem.authUser !== null){
	    		return <Redirect to='/user/home' />
	    	}
	    	else return <WrappedComponent {...this.props} />

	    }	
	}

	const mapStateToProps = ({authSystem}) => ({authSystem})

	return connect(mapStateToProps)(Authentication);	

}

export default mustBeLoggedOut