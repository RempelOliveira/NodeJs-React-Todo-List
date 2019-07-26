import axios from "axios";
import jwt_decode from "jwt-decode";

const md5 =	require("md5");

export const GET_USER      = "GET_USER";
export const SIGNIN_USER   = "SIGNIN_USER";
export const SIGNUP_USER   = "SIGNUP_USER";
export const SIGNOUT_USER  = "SIGNOUT_USER";
export const UPDATE_USER   = "UPDATE_USER";
export const ACTIVATE_USER = "ACTIVATE_USER";
export const FORM_ERROR    = "FORM_ERROR";

const apiUrl = "http://localhost:3001/api/users";

export function getUser(id)
{
	return (dispatch) =>
	{
        return axios.get(`${apiUrl}/${id}`)
            .then(res =>
			{
				dispatch(signInUserSuccess(res.data));

			})
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formUserFailed({network: "An internal error occurred. Please contact your system administrator"}));

				}
				else
				{
					if(err.response.status === 401)
					{
						dispatch(signOutUser()).then(() =>
						{
							window.location.href = "/user/sign-in";

						});

					}

					dispatch(formUserFailed(err.response.data));

				}

				throw (err);

            });

    };

};

export function getUserSuccess(user)
{
	return {
        type: GET_USER, payload: user

	};

};

export function signInUser({email, password})
{
	return (dispatch) =>
	{
		if(password)
			password = md5(password);

        return axios.post(`${apiUrl}/login`, {email, password})
            .then(res =>
			{
				const { token } = res.data;
				const   decoded = jwt_decode(token);

				setAuthentication(token);
				dispatch(signInUserSuccess(decoded));

			})
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formUserFailed({network: "An internal error occurred. Please contact your system administrator"}));

				}
				else
					dispatch(formUserFailed(err.response.data));

				throw (err);

            });

    };

};

export function signInUserSuccess(user)
{
	return {
        type: SIGNIN_USER, payload: user

	};

};

export function signUpUser({name, email, password, password2 = password, avatar})
{
	return (dispatch) =>
	{
		if(password)
			password = password2 = md5(password);

		let data = new FormData();

			data.append("name", name);
			data.append("email", email);
			data.append("password", password);
			data.append("password2", password2);
			data.append("avatar", avatar);

		return axios.post(`${apiUrl}/register`, data)
			.then(res =>
			{
				dispatch(signUpUserSuccess(res.data));

			})
			.catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formUserFailed({network: "An internal error occurred. Please contact your system administrator"}));

				}
				else
					dispatch(formUserFailed(err.response.data));

				throw (err);

			});

    };

};

export function signUpUserSuccess(data)
{
	return {
        type: SIGNUP_USER, payload: data

	};

};

export function activateUser(id)
{
	return (dispatch) =>
	{
        return axios.put(`${apiUrl}/activate/${id}`)
            .then(res =>
			{
				const { token } = res.data;
				const   decoded = jwt_decode(token);

				setAuthentication(token);
				dispatch(activateUserSuccess(decoded));

			})
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formUserFailed({network: "An internal error occurred. Please contact your system administrator"}));

				}
				else
					dispatch(formUserFailed(err.response.data));

				throw (err);

            });

    };

};

export function activateUserSuccess(user)
{
	return {
        type: ACTIVATE_USER, payload: user

	};

};

export function signOutUser()
{
	return (dispatch) =>
	{
		return Promise.resolve("Success")
			.then(() =>
			{
				setAuthentication();
				dispatch(signOutUserSuccess());

			})
            .catch(err =>
			{
                throw(err);

            });

	};

};

export function signOutUserSuccess(user)
{
	return {
        type: SIGNOUT_USER

	};

};

export function updateUser({id, name, email, password, password2 = password, avatar})
{
	return (dispatch) =>
	{
		let data = new FormData();

			data.append("name", name);
			data.append("email", email);
			data.append("avatar", avatar);

			if(password)
			{
				password = 
					password2 = md5(password);

				data.append("password", password);
				data.append("password2", password2);

			}

		return axios.put(`${apiUrl}/${id}`, data)
			.then(res =>
			{
				const { token } = res.data;
				const   decoded = jwt_decode(token);

				setAuthentication(token);
				dispatch(updateUserSuccess(decoded));

			})
			.catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formUserFailed({network: "An internal error occurred. Please contact your system administrator"}));

				}
				else
				{
					if(err.response.status === 401)
					{
						dispatch(signOutUser()).then(() =>
						{
							window.location.href = "/user/sign-in";

						});

					}

					dispatch(formUserFailed(err.response.data));

				}

				throw (err);

			});

	};

};

export function updateUserSuccess(user)
{
	return {
		type: UPDATE_USER, payload: user

	};

};

export function formUserFailed(errors = {})
{
	return {
        type: FORM_ERROR, payload: errors

	};

};

export function setAuthentication(token)
{
	if(token)
	{
        axios.defaults.headers.common["Authorization"] = token;
		localStorage.setItem("jwtToken", token);

    }
    else
	{
        delete axios.defaults.headers.common["Authorization"];
		localStorage.removeItem("jwtToken");

	}

};