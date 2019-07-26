import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateTask } from "../../../actions/Tasks";
import TextInput from "../../../components/Forms/TextInput";

import Link from "../../../components/Screens/Link";
import Button from "../../../components/Forms/Button";

const mapStateToProps = state =>
{
    return {
		tasks: state.taskReducer.tasks, user:
		{
			isAuthenticated: state.userReducer.isAuthenticated,
					   data: state.userReducer.user

		}

	};

};

const mapDispatchToProps = dispatch =>
{
    return {
        updateTask: task => dispatch(updateTask(task))

    };

};

class Task extends Component
{
    constructor({task})
	{
        super();

        this.state =
		{
			user : task.user,
            title: task.title

        };

		this.handleBlur   = this.handleBlur.bind(this);
		this.handleClick  = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleBlur()
	{
        const { task } = this.props;
		const { user } = this.props;

        if(task.title !== this.state.title)
		{
			task.user  = user.data.id || null;
			task.title = this.state.title;

			this.props.updateTask(task);

		}

    }

	handleClick(event)
	{
		event.preventDefault();

        const { task } = this.props;
		const { user } = this.props;

		task.user  	   = user.data.id || null;
		task.completed = !task.completed;

        this.props.updateTask(task);

	}

	handleChange(event)
	{
		this.setState({
			title: event.target.value

		});

	}

    render()
	{
		const { task } = this.props;

		let lockIcon =
			<span className="icon is-primary">
				<FontAwesomeIcon icon={["fas", "user-lock"]} />
			</span>;

        return (
            <div className="box" key={task._id}>
                <div className="columns is-mobile">

                    <div className="column is-1 is-centered">
                        <span className="icon is-primary">
							<Button
								label 	  = ""
								className = "button button-link is-white"

								icon =
								{[
									"far", task.completed ? "check-circle" : "circle"]}

								onClick = {this.handleClick}

							/>
						</span>
                    </div>

                    <div className="column is-9">
                        <TextInput
                            id		  = {task._id}
                            name	  = {"title"}
                            value	  = {this.state.title}
                            className = "is-shadowless"
							onChange  = {this.handleChange}
							onBlur	  = {this.handleBlur}

                        />
                    </div>

                    <div className="column is-1 is-centered">
                        <Link
							to	  	  = {`/tasks/update/${task._id}`}
							label 	  = "Edit"
							className = "button is-primary is-small"

						/>
                    </div>

                    <div className="column is-1 is-centered">
						{task.user ? lockIcon : ""}
                    </div>

                </div>
            </div>

        );

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Task);