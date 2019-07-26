import React,{ Component, Fragment } from "react";
import { connect } from "react-redux";

import { getAllTasks } from "../../actions/Tasks";

import Task from "./Partials/Task";
import MenuTab from "./Partials/MenuTab";

import Link from "../../components/Screens/Link";

const mapStateToProps = state =>
{
    return {
		tasks: state.taskReducer.tasks, user:
		{
			isAuthenticated: state.userReducer.isAuthenticated,
					   data: state.userReducer.user

		},

		filterCompleted: state.taskReducer.filterCompleted

	};

};

const mapDispatchToProps = dispatch =>
{
	return {
		getAllTasks: () => dispatch(getAllTasks())

    };

}

class List extends Component
{
    componentDidMount()
	{
		let { user }    = this.props;
		let { history } = this.props;

		if(user.isAuthenticated && !user.data.active)
			return history.push("/user/activate");

		this.props.getAllTasks();

    }

    render()
	{
		let tasks = this.props.tasks.filter(task =>
			task.completed === this.props.filterCompleted

		);

		return (
			<Fragment>
				<div className="columns">
					{
						this.props.user.isAuthenticated
							?
								<Fragment>
									<div className="column is-half">
										<Link
											to        = "/tasks/create"
											label     = "Create New Task"
											className = "button is-link is-medium is-fullwidth"

											icon = 
											{[
												"fas", "plus"]}

										/>
									</div>
									<div className="column is-half">
										<Link
											to        = "/tasks/upload"
											label     = "Upload Excel"
											className = "button is-link is-medium is-fullwidth"

											icon = 
											{[
												"fas", "file-upload"]}

										/>
									</div>
								</Fragment>
							:
								<div className="column is-full">
									<Link
										to        = "/tasks/create"
										label     = "Create New Task"
										className = "button is-link is-medium is-fullwidth"

										icon = 
										{[
											"fas", "plus"]}

									/>
								</div>
					}
				</div>
				<MenuTab />
				<div className="is-task-list">
					<Fragment>
						{
							tasks.length
								?
									<Fragment>
										{
											tasks.map(task => (<Task task={task} key={task._id} />))

										}
									</Fragment>
								:
									<div className="box has-text-centered">
										<p className="is-size-6">There's no task created</p>
									</div>									
						}
					</Fragment>
				</div>
				{
					this.props.user.isAuthenticated
						?
							<div className="level">
								<div className="level-left">
									
								</div>
								<div className="level-right">
									<div className="level-item">
										<Link
											to        = "/user/account"
											label     = "Account"
											className = "button is-light is-medium is-fullwidth"

										/>
									</div>
									<div className="level-item">
										<Link
											to    	  = "/user/sign-out"
											label 	  = "Sign Out"
											className = "button is-light is-medium is-fullwidth"

										/>
									</div>
								</div>
							</div>
						:
							<div className="level">
								<div className="level-left">
									
								</div>
								<div className="level-right">
									<div className="level-item">
										<Link
											to    	  = "/user/sign-in"
											label     = "Sign In"
											className = "button is-light is-medium is-fullwidth"

										/>
									</div>
									<div className="level-item">
										<Link
											to        = "/user/sign-up"
											label     = "Sign Up"
											className = "button is-light is-medium is-fullwidth"

										/>
									</div>
								</div>
							</div>
				}
			</Fragment>

        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(List);