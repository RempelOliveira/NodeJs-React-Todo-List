import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { signOutUser } from "../../actions/User";

import Button from "../../components/Forms/Button";

const mapDispatchToProps = dispatch =>
{
    return {
        signOutUser: () => dispatch(signOutUser())

    };

};

class ActivateMessage extends Component
{
    constructor()
	{
        super()

        this.state =
		{
            id		: "",
            name	: "",
            email	: "",
			avatar  : ""

        };

		this.handleClick = this.handleClick.bind(this);

    }

    handleClick()
	{
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

	render()
	{
		return (
			<Fragment>
				<div className="field">
					<label className="label">
						Activate your account via the link sent to you via email.
					</label>
				</div>
				<div className="field">
					<div className="level">
						<div className="level-left">
							
						</div>
						<div className="level-right">
							<div className="level-item">
								<Button
									label	  = "Go back to homepage"
									className = "button is-link"
									onClick   = {this.handleClick}

								/>
							</div>
						</div>
					</div>
				</div>
			</Fragment>

		);

	}

};

export default withRouter(connect(null, mapDispatchToProps)(ActivateMessage));