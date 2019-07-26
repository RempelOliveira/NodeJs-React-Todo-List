import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUser, activateUser, signOutUser } from "../../actions/User";

import Button from "../../components/Forms/Button";

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
		getUser		: id => dispatch(getUser(id)),
		signOutUser	: () => dispatch(signOutUser()),
		activateUser: id => dispatch(activateUser(id))

    };

};

class Activate extends Component
{
    constructor()
	{
        super();

        this.handleClickNo  = this.handleClickNo.bind(this);
		this.handleClickYes = this.handleClickYes.bind(this);

    }

    componentDidMount()
	{
		let { history } = 
			this.props;

		this.props.getUser(this.props.match.params.id)
			.then(() =>
			{
				if(!Object.keys(this.props.errors).length)
				{
					let { user } =
						this.props;

					if(this.props.user.data.active === false)
					{
						const params =
						{
							name  : user.data.name   ? 				 user.data.name   : "Guest",
							email : user.data.email  ? 				 user.data.email  : "",
							avatar: user.data.avatar ? "/uploads/" + user.data.avatar : ""

						};

						Promise.resolve("Success").then(() => this.props.onChangeUserName(params));

					}
					else
						history.push("/user/sign-in");

				}
				else
				{
					

				}

			})
			.catch(() =>
			{
				Promise.resolve("Success").then(() => this.props.onChangeUserName({name: "Guest", email: "", avatar: ""}));

			});

	}

    handleClickNo(event)
	{
		event.preventDefault();

		let { history } = 
			this.props;

		this.props.signOutUser().then(() =>
		{
			Promise.resolve("Success").then(() => this.props.onChangeUserName({name: "Guest", email : "", avatar: ""})).then(() =>
			{
				history.push("/")

			});
			

		});

    }

    handleClickYes(event)
	{
		event.preventDefault();

		let { history } = 
			this.props;

		this.props.activateUser(this.props.match.params.id).then(() =>
		{
			history.push("/")

		});

    }

	render()
	{
		let { errors } = this.props;

		return (
			<Fragment>
				<h1 className="title has-text-grey-dark">
					Activate your registration?
				</h1>
				{
					errors.general
						?
							<div className="message is-danger is-marginless">
								<div className="message-header">
									<span className="title is-7">{errors.general}</span>
								</div>
							</div>
						:
							""
				}
				<div className="field">
					<div className="level">
						<div className="level-left">
							
						</div>
						<div className="level-right">
							{
								!errors.general
									?
										<Fragment>
											<div className="level-item">
												<Button
													label	  = "No"
													className = "button is-white"
													onClick   = { this.handleClickNo }

												/>
											</div>
											<div className="level-item">
												<Button
													label	  = "Yes"
													className = "button is-link"
													onClick   = { this.handleClickYes }

												/>
											</div>
										</Fragment>

									:
										<div className="level-item">
											<Button
												label	  = "Go back to homepage"
												className = "button is-link"
												onClick   = { this.handleClickNo }

											/>
										</div>

							}
						</div>
					</div>
				</div>
			</Fragment>

		);

	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activate));