// utilities.js

export const isLoginValuesValid = ({username, password}) => username.length >= 5 && password.length >= 5

export const getLoginValues = event => {
	event.preventDefault()
	const username = event.target.username.value.trim()
	const password = event.target.password.value.trim()

	const values = {username, password}
	return values
}


export const getSignupFormValues = (event) => {
	event.preventDefault()
	const username = event.target.username.value.trim()
	const password = event.target.password.value.trim()
	const confirm = event.target.confirm_password.value.trim()
	const email = event.target.email.value.trim()

	return {
		username, password, confirm, email
	}		
}

export const areSignupValuesOK = (values) => checkInputLenghts(values) && checkConfirmMatch(values)

export const checkConfirmMatch = ({ password, confirm }) => password === confirm

export const checkInputLenghts = (form) => Object.values(form).every(v => v.length >= 5)


