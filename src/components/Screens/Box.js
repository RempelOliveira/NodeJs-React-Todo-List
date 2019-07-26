import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import TasksRead from "../../screens/Tasks/Read";
import TasksCreateUpdate from "../../screens/Tasks/CreateUpdate";
import TasksUpload from "../../screens/Tasks/Upload";
import TasksDelete from "../../screens/Tasks/Delete";

import UserAuth from "../../screens/User/Auth";
import UserCreateUpdate from "../../screens/User/CreateUpdate";
import UserActivate from "../../screens/User/Activate";
import UserActivateMessage from "../../screens/User/ActivateMessage";

import PageNotFound from "../../screens/404.js";

const mapStateToProps = state =>
{
	return {
		user:
		{
			isAuthenticated: state.userReducer.isAuthenticated,
					   data: state.userReducer.user

		},

		errors: state.taskReducer.errors || state.userReducer.errors

    };

};

class Box extends Component
{
    constructor()
	{
        super();

        this.state =
		{
			name  : "",
			email : "",
			avatar: ""

        };

		this.handleChange = this.handleChange.bind(this);

    }

	componentDidMount()
	{
		let { user } = this.props;

		this.setState({
			name  : user.isAuthenticated ? 				 user.data.name   : "Guest",
			email : user.isAuthenticated ? 				 user.data.email  : "",
			avatar: user.isAuthenticated ? "/uploads/" + user.data.avatar : "/img/user.png"

		});

	}

	componentDidUpdate()
	{
		let { user  } = this.props;
		let { state } = this;

		if(user.isAuthenticated && state.name != user.data.name)
		{
			this.setState({
				name  : user.isAuthenticated ? 				 user.data.name   : "Guest",
				email : user.isAuthenticated ? 				 user.data.email  : "",
				avatar: user.isAuthenticated ? "/uploads/" + user.data.avatar : "/img/user.png"

			});

		}

	}

    handleChange(user)
	{
		if(user.avatar === "")
			user.avatar = "/img/user.png";

		this.setState(user);

    }

    render()
	{
		let { state }  = this;

		let { user }   = this.props;
		let { errors } = this.props;

		return (
			<div className="content is-small">
				<div className="columns is-mobile is-centered is-vcentered">
					<div className="column is-width-94">
						<figure className="image is-64x64">
							<img src={state.avatar} className="is-rounded" onError={(e) => { e.target.src="/img/user.png" }} alt={state.name || ""} />
						</figure>
					</div>
					<div className="column">
							<span className="title is-5">
								{state.name}
							</span>
						<br />
							<span className="subtitle is-6">
								{state.email}
							</span>
					</div>
				</div>
				<div className="box">
					<BrowserRouter>
						<Switch>

							<Route exact path="/" 				   component={TasksRead} />
							<Route exact path="/tasks/create" 	   component={TasksCreateUpdate} />
							<Route exact path="/tasks/upload" 	   component={TasksUpload} />
							<Route exact path="/tasks/update/:id"  component={TasksCreateUpdate} />
							<Route exact path="/tasks/delete/:id"  component={TasksDelete} />

							<Route exact path="/user/sign-in" 	   render={() => <UserAuth 		   onChangeUserName={this.handleChange} />} />
							<Route exact path="/user/sign-out" 	   render={() => <UserAuth 		   onChangeUserName={this.handleChange} />} />
							<Route exact path="/user/sign-up" 	   render={() => <UserCreateUpdate onChangeUserName={this.handleChange} />} />
							<Route exact path="/user/account" 	   render={() => <UserCreateUpdate onChangeUserName={this.handleChange} />} />

							<Route exact path="/user/activate" 	   render={() => <UserActivateMessage onChangeUserName={this.handleChange} />} />
							<Route exact path="/user/activate/:id" render={() => <UserActivate 	      onChangeUserName={this.handleChange} />} />

							<Route path="/404" component={PageNotFound} />
							<Redirect to="/404" />

						</Switch>
					</BrowserRouter>
					{
						errors.network
							?
								<div className="message network-error is-danger">
									<div className="message-header">
										<span className="title is-7">{errors.network}</span>
									</div>
								</div>
							:
								""
					}
				</div>
			</div>

		);

	}

};

export default connect(mapStateToProps, null)(Box);