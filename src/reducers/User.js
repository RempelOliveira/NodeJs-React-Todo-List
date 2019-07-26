import { GET_USER, SIGNIN_USER, SIGNUP_USER, SIGNOUT_USER, UPDATE_USER, ACTIVATE_USER, FORM_ERROR } from "../actions/User";

const isEmpty = require("is-empty");
const initialState =
{
	user: {},
	errors: {},
	isAuthenticated: false

};

function userReducer(state = initialState, action)
{
	if(action.type === GET_USER)
	{
		return {
			...state, isAuthenticated: false, user: action.payload, errors: {}

		};

	}

	if(action.type === SIGNIN_USER)
	{
		return {
			...state, isAuthenticated: !isEmpty(action.payload), user: action.payload, errors: {}

		};

	}

	if(action.type === SIGNUP_USER)
	{
		return {
			...state, isAuthenticated: false, user: action.payload, errors: {}

		};

	}

	if(action.type === ACTIVATE_USER)
	{
		return {
			...state, isAuthenticated: !isEmpty(action.payload), user: action.payload, errors: {}

		};

	}

	if(action.type === SIGNOUT_USER)
	{
		return {
			...state, isAuthenticated: false, user: {}, errors: {}

		};

	}

	if(action.type === UPDATE_USER)
	{
		return {
			...state, isAuthenticated: !isEmpty(action.payload), user: action.payload, errors: {}

		};

	}

	if(action.type === FORM_ERROR)
	{
		return {
			...state, errors: action.payload

		};

	}

    return state;

};

export default userReducer;