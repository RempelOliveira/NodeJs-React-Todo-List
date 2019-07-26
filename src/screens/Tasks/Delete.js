import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Moment from "moment";

import { getTask, deleteTask } from "../../actions/Tasks";

import Link from "../../components/Screens/Link";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

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
		getTask	  : (id, user) => dispatch(getTask(id, user)),
        deleteTask: (id, user) => dispatch(deleteTask(id, user))

    };

};

class Delete extends Component
{
    constructor()
	{
        super();

        this.state =
		{
            title			: "",
            details			: "",
            remember_me_date: "",
			loading			: false

        };

        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount()
	{
		let { id } = this.props.match.params;

		let { user } 	= this.props;
		let { history } = this.props;

		if(user.isAuthenticated && !user.data.active)
			return history.push("/user/activate");

		if(id)
		{
			this.props.getTask(id, this.props.user.data.id || null).then(res =>
			{
				const { task } =
					this.props;

				task.remember_me_date =
					task.remember_me_date ? Moment.utc(task.remember_me_date).format("YYYY-MM-DD") : "";

				this.setState(task);

			});

        }

    }

    handleClick(event)
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

		this.props.deleteTask(this.props.match.params.id, this.props.user.data.id || null)
			   .then(response.then)
			.finally(response.finally);

    }

    render()
	{
        return (
            <Fragment>
				<h1 className="title has-text-grey-dark">
					Are you delete this task?
				</h1>
				{
					this.props.errors.general
						?
							<Fragment>
								<div className="message is-danger is-marginless">
									<div className="message-header">
										<span className="title is-7">{this.props.errors.general}</span>
									</div>
								</div>
								<div className="field">
									<div className="level">
										<div className="level-left">
											
										</div>
										<div className="level-right">
											<div className="level-item">
												<Link
													to		  = "/"
													label	  = "Go back to homepage"
													className = "button is-link"

												/>
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						:
							<Fragment>
								<div className="field">
									<label className="label">
										Title
									</label>
									{this.state.title}
								</div>
								<div className="field">
									<label className="label">
										Details&nbsp;
										<span className="has-text-weight-light">
											- Optional
										</span>
									</label>
									{this.state.details}
								</div>
								<div className="field">
									<label className="label">
										Remember me at&nbsp;
										<span className="has-text-weight-light">
											- Optional
										</span>
									</label>
									{this.state.remember_me_date}
								</div>
								<div className="field">
									<div className="level">
										<div className="level-left">
											
										</div>
										<div className="level-right">
											<div className="level-item">
												<Link
													to		  = "/"
													label	  = "No"
													className = "control button is-white"

												/>
											</div>
											<div className="level-item">
												<LaddaButton
													data-spinner-color = "#fff"
													data-style		   = { ZOOM_OUT }
													loading			   = { this.state.loading }
													onClick   		   = { this.handleClick }

												>
													Yes
												</LaddaButton>
											</div>
										</div>
									</div>
								</div>
							</Fragment>
				}
            </Fragment>

        );

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Delete);