import { ADD_TASK, GET_TASKS, UPDATE_TASK, FILTER_COMPLETED_TASKS, GET_TASK, DELETE_TASK, UPLOAD_TASKS, FORM_ERROR } from "../actions/Tasks";

const initialState =
{
	task: null,
	tasks: [],
	errors: {},
    filterCompleted: false

};

function taskReducer(state = initialState, action)
{
    if(action.type === ADD_TASK)
	{
        return {
            ...state, tasks: [...state.tasks, action.payload], errors: {}

        };

    }

    if(action.type === GET_TASKS)
	{
        return {
            ...state, tasks: [...action.payload.tasks], errors: {}

        };

    }

	if(action.type === UPDATE_TASK)
	{
		const updatedTasks = state.tasks.map(task =>
		{
			if(task._id === action.payload._id)
			{
				return {
					...task, ...action.payload, errors: {}

				};

			}

			return task;

		});

		return {
			...state, tasks: [...updatedTasks], errors: {}

		};

	}

    if(action.type === UPLOAD_TASKS)
	{
        return {
            ...state, tasks: [...action.payload.tasks], errors: {}

        };

    }

	if(action.type === FILTER_COMPLETED_TASKS)
	{
		return {
			...state, filterCompleted: action.payload.active, errors: {}

		};

	}

	if(action.type === GET_TASK)
	{
		return {
			...state, task: action.payload, errors: {}
			
		};

	}

	if(action.type === DELETE_TASK)
	{
		return {
			...state, tasks: state.tasks.filter(task => task._id !== action.payload.id), errors: {}

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

export default taskReducer;