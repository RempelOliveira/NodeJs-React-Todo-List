import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { uploadTasks, formTaskFailed } from "../../actions/Tasks";
import FormUpload from "./Partials/FormUpload";

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
		uploadTasks   : (id, excel) => dispatch(uploadTasks(id, excel)),
		formTaskFailed:      errors => dispatch(formTaskFailed(errors))

    };

};

class Upload extends Component
{
    constructor()
	{
        super();

        this.state =
		{
            excel  : "",
			loading: false

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

	componentDidMount()
	{
		let { user } 	= this.props;
		let { history } = this.props;

		if(!user.isAuthenticated || (user.isAuthenticated && !user.data.active))
			return history.push("/user/activate");

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

		this.props.uploadTasks(this.props.user.data.id, this.state.excel)
			   .then(response.then)
			.finally(response.finally);

    }

    handleChange(event, file)
	{
		this.props.formTaskFailed({});

		if(file)
		{
			this.setState({
				[event.target.id]: file

			});

		}

    }

    render()
	{
        return (
            <Fragment>
                <h1 className="title has-text-grey-dark">
					Upload Excel
				</h1>
				<FormUpload
					state    = { this.state }
					errors	 = { this.props.errors }

					onSubmit = { this.handleSubmit }
					onChange = { this.handleChange }

				/>
            </Fragment>

        );

    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upload));