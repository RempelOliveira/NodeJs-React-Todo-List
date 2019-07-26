import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { signInUser, signOutUser, formUserFailed } from "../../actions/User";

import SignIn from "./Partials/SignIn";
import SignOut from "./Partials/SignOut";

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
		signInUser	  : user   => dispatch(signInUser(user)),
		signOutUser	  : () 	   => dispatch(signOutUser()),
		formUserFailed: errors => dispatch(formUserFailed(errors))

    };

};

class Auth extends Component
{
    constructor()
	{
        super();

        this.state =
		{
            email	: "",
            password: ""

        };

		this.handleChange  = this.handleChange.bind(this);

		this.handleSignIn  = this.handleSignIn.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);

    }

    componentDidMount()
	{
		this.props.formUserFailed();

	}

    handleChange(event)
	{
        this.setState({
            [event.target.id]: event.target.value

        });

    }

    handleSignIn(event)
	{
        event.preventDefault();

		this.props.signInUser(this.state).then(() =>
		{
			if(!Object.keys(this.props.errors).length)
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

		});

    }

	handleSignOut(event)
	{
		event.preventDefault();

		let { history } = 
			this.props;

		this.props.signOutUser().then(() =>
		{
			this.props.onChangeUserName({
				name  : "Guest",
				email : "",
				avatar: ""

			});

			history.push("/");

		});

	}

	render()
	{
		let { id } = this.props.match.params || null;

		const isSignIn =
			this.props.match.url.match("/sign-in") != null;

        return (
            <Fragment>
                <h1 className="title has-text-grey-dark">
					{
						isSignIn ? "Sign In" : "Are you signing out?"

					}
				</h1>
				{
					isSignIn
						?
							<SignIn
								id		 = { id }
								state    = { this.state }
								errors	 = { this.props.errors }

								onSubmit = { this.handleSignIn }
								onChange = { this.handleChange }

							/>
						:
							<SignOut
								onClick = { this.handleSignOut }

							/>

				}
            </Fragment>

        );

    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));