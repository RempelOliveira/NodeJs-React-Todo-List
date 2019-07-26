import axios from "axios";
import { signOutUser } from "./User";

export const ADD_TASK 				= "ADD_TASK";
export const GET_TASKS 				= "GET_TASKS";
export const UPDATE_TASK 			= "UPDATE_TASK";
export const FILTER_COMPLETED_TASKS = "FILTER_COMPLETED_TASKS";
export const GET_TASK 				= "GET_TASK";
export const DELETE_TASK 			= "DELETE_TASK";
export const UPLOAD_TASKS			= "UPLOAD_TASKS";
export const FORM_ERROR 			= "FORM_ERROR";

const apiUrl = "http://localhost:3001/api/tasks";

export function getAllTasks()
{
    return (dispatch) =>
	{
        return axios.get(`${apiUrl}`)
            .then(res =>
			{
				dispatch(getAllTasksSuccess(res.data));

            })
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formTaskFailed({network: "An internal error occurred. Please contact your system administrator"}));

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

				}

                throw (err);

            });

    };

};

export function getAllTasksSuccess(tasks)
{
    return {
		type: GET_TASKS, payload: { tasks }

	};

};

export function addTask({user, title, details, conclusion_date, remember_me_date})
{
    return (dispatch) =>
	{
        return axios.post(`${apiUrl}`, {user, title, details, conclusion_date, remember_me_date})
            .then(res =>
			{
                dispatch(addTaskSuccess(res.data));

            })
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formTaskFailed({network: "An internal error occurred. Please contact your system administrator"}));

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

					dispatch(formTaskFailed(err.response.data));

				}

				throw (err);

            });

    };

};

export function addTaskSuccess(task)
{
	return {
        type: ADD_TASK, payload: { task }

	};

};

export function uploadTasks(id, excel)
{
    return (dispatch) =>
	{
		let data = new FormData();

			data.append("id", id);
			data.append("excel", excel);

        return axios.post(`${apiUrl}/upload`, data)
            .then(res =>
			{
                dispatch(uploadTaskSuccess(res.data));

            })
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formTaskFailed({network: "An internal error occurred. Please contact your system administrator"}));

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

					dispatch(formTaskFailed(err.response.data));

				}

				throw (err);

            });

    };

};

export function uploadTaskSuccess(tasks)
{
	return {
        type: UPLOAD_TASKS, payload: { tasks }

	};

};

export function updateTask({_id, user, title, completed, details, conclusion_date, remember_me_date})
{
	return (dispatch) =>
	{
		return axios.put(`${apiUrl}/${_id}`, {_id, user, title, completed, details, conclusion_date, remember_me_date})
			.then(res =>
			{
				dispatch(updateTaskSuccess(res.data));

			})
			.catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formTaskFailed({network: "An internal error occurred. Please contact your system administrator"}));

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

					dispatch(formTaskFailed(err.response.data));

				}

				throw (err);

			});

	};

};

export function updateTaskSuccess(task)
{
	return {
		type: UPDATE_TASK, payload: task

	};

};

export function filterCompletedTasks(active)
{
    return {type: FILTER_COMPLETED_TASKS, payload: {active}};

}

export function getTask(id)
{
    return (dispatch) =>
	{
        return axios.get(`${apiUrl}/${id}`)
            .then(res =>
			{
				dispatch(getTaskSuccess(res.data))

            })
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formTaskFailed({network: "An internal error occurred. Please contact your system administrator"}));

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
					else
						dispatch(formTaskFailed(err.response.data));

				}

                throw(err);

            });

    };

};

export function getTaskSuccess(task)
{
	return {
        type: GET_TASK, payload: task

	};

}

export function deleteTask(id)
{
    return (dispatch) =>
	{
        return axios.delete(`${apiUrl}/${id}`)
            .then(res =>
			{
				dispatch(deleteTaskSuccess(res.data));

            })
            .catch(err =>
			{
				if(err.response === undefined)
				{
					dispatch(formTaskFailed({network: "An internal error occurred. Please contact your system administrator"}));

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

				}

                throw(err);

            });

    };

};

export function deleteTaskSuccess(id)
{
    return {
        type: DELETE_TASK, payload: {id}

	};
};

export function formTaskFailed(errors = {})
{
	return {
        type: FORM_ERROR, payload: errors

	};

};