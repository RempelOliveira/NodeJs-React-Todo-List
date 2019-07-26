import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { signUpUser, updateUser, formUserFailed } from "../../actions/User";

import Form from "./Partials/Form";

const mapStateToProps = state =>
{
    return {
        user:
		{
			isAuthenticated: state.userReducer.isAuthenticated,
					   data: state.userReducer.user

		},

		errors: state.userReducer.errors

    };

};

const mapDispatchToProps = dispatch =>
{
    return {
		signUpUser	    : user   => dispatch(signUpUser(user)),
		updateUser	    : user   => dispatch(updateUser(user)),
		formUserFailed  : errors => dispatch(formUserFailed(errors))

    };

};

class CreateUpdate extends Component
{
    constructor()
	{
        super();

        this.state =
		{
            id		: "",
            name	: "",
            email	: "",
            password: "",
			avatar  : "",
			loading : false

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

    }

    componentDidMount()
	{
		let { user } 	= this.props;
		let { history } = this.props;

		if(!user.isAuthenticated && this.props.location.pathname.match("/user/account") != null)
			return history.push("/user/sign-up");

		if(user.isAuthenticated && !user.data.active)
			return history.push("/user/activate");

		this.props.formUserFailed();

		if(user.data.id)
			this.setState(user.data);

    }

    handleSubmit(event)
	{
        event.preventDefault();

		const response =
		{
			then: (to) =>
			{
				setTimeout(() =>
				{
					if(!Object.keys(this.props.errors).length)
						this.props.history.push(to);

				}, 500);

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

		if(this.state.id)
		{
			let state = { ...this.state };

			if(state.password === "")
				delete state.password;

			this.props.updateUser(state)
				   .then(response.then("/"))
				.finally(response.finally);

        }
        else
		{
			this.props.signUpUser(this.state)
				   .then(response.then("/user/activate"))
				.finally(response.finally);

		}

    }

    handleChange(event, file, base64)
	{
		if(!file)
		{
			this.setState({
				[event.target.id]: event.target.value

			});

			if(event.target.id === "name")
				this.props.onChangeUserName({name: event.target.value});

			if(event.target.id === "email")
				this.props.onChangeUserName({email: event.target.value});

		}
		else
		{
			this.setState({
				[event.target.id]: file

			});

			this.props.onChangeUserName({avatar: base64});

		}

    }

    handleCancel()
	{
		let { user } =
			this.props;

		const params =
		{
			name  : user.data.name   ? 				 user.data.name   : "Guest",
			email : user.data.email  ? 				 user.data.email  : "",
			avatar: user.data.avatar ? "/uploads/" + user.data.avatar : ""

		};

		Promise.resolve("Success").then(() => this.props.onChangeUserName(params)).then(() =>
		{
			this.props.history.push("/");

		});

    }

    render()
	{
		let { props } = this;
		let { id } 	  = props.user.data || "";

		return (
			<Fragment>
				<h1 className="title has-text-grey-dark">
					{id ? "Update" : "Create"} User
				</h1>
				<Form
					id		 = { id }
					state    = { this.state }
					errors	 = { this.props.errors }

					onSubmit = { this.handleSubmit }
					onChange = { this.handleChange }
					onCancel = { this.handleCancel }

				/>
			</Fragment>

		);

    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUpdate));