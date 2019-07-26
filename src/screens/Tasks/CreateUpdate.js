import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "moment";

import { addTask, updateTask, getTask, formTaskFailed } from "../../actions/Tasks";
import Form from "./Partials/Form";

const mapStateToProps = state =>
{
    return {
        task: state.taskReducer.task, user:
		{
			isAuthenticated: state.userReducer.isAuthenticated,
					   data: state.userReducer.user

		},

		errors: state.taskReducer.errors

    };

};

const mapDispatchToProps = dispatch =>
{
    return {
        getTask	  	  : id 	   => dispatch(getTask(id)),
		addTask	  	  : task   => dispatch(addTask(task)),
		updateTask	  : task   => dispatch(updateTask(task)),
		formTaskFailed: errors => dispatch(formTaskFailed(errors))

    };

};

class CreateUpdate extends Component
{
    constructor()
	{
        super();

        this.state =
		{
            _id				: "",
			user			: null,
            title			: "",
            details			: "",
            remember_me_date: "",
			loading			: false,

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount()
	{
		let { id } = this.props.match.params;

		let { user } 	= this.props;
		let { history } = this.props;

		if(user.isAuthenticated && !user.data.active)
			return history.push("/user/activate");

		this.props.formTaskFailed();

		this.setState({
			user: user.data.id || null

		});

		if(id)
		{
			this.props.getTask(id).then(() =>
			{
				let { task } = this.props;

				task.user =
					this.props.user.data.id || null;

				task.remember_me_date =
					task.remember_me_date ? Moment.utc(task.remember_me_date).format("YYYY-MM-DD") : "";

				this.setState(task);

			});

		}

    }

    handleSubmit(event)
	{
        event.preventDefault();

		const response =
		{
			then: () =>
			{
				setTimeout(() =>
				{
					if(!Object.keys(this.props.errors).length)
						this.props.history.push("/");

				}, 355);

			},

			finally: () =>
			{
				setTimeout(() =>
				{
					this.setState({
						loading: false

					});

				}, !Object.keys(this.props.errors).length ? 350 : 0);

			}

		};

		this.setState({
			loading: true

		});

		if(this.state._id)
		{
			this.props.updateTask(this.state)
				   .then(response.then)
				.finally(response.finally);

        }
        else
		{
			this.props.addTask(this.state)
				   .then(response.then)
				.finally(response.finally);

		}

    }

    handleChange(event)
	{
        this.setState({
            [event.target.id]: event.target.value

        });

    }

    render()
	{
		let { id } = this.props.match.params || "";

        return (
            <Fragment>
                <h1 className="title has-text-grey-dark">
					{id ? "Update" : "Create"} Task
				</h1>
				<Form
					id		 = { id }
					state    = { this.state }
					errors	 = { this.props.errors }

					onSubmit = { this.handleSubmit }
					onChange = { this.handleChange }

				/>
            </Fragment>

        );

    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUpdate));