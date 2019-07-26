import React from "react";
import { connect } from "react-redux";
import { filterCompletedTasks } from "../../../actions/Tasks";

import Tab from "../../../components/Screens/Tab";

const mapStateToProps = state =>
{
    return {
		tasks: state.taskReducer.tasks,
		filterCompleted: state.taskReducer.filterCompleted
		
	};

};

const mapDispatchToProps = dispatch =>
{
    return {
        applyFilter: (active) => dispatch(filterCompletedTasks(active))

    };

};

const MenuTab = ({tasks, filterCompleted, applyFilter}) =>
{
	const numberOfCompletedTasks = tasks.filter(task => task.completed).length;

    return (
        <div className="tabs is-fullwidth has-text-weight-bold">
            <ul className="is-marginless">
                <Tab
                    text="Incomplete"
                    quantity={tasks.length - numberOfCompletedTasks}
                    className={filterCompleted ? "" : "is-active"}
					onClick={() => applyFilter(false)}
                />

                <Tab
                    text="Completed"
                    quantity={numberOfCompletedTasks}
                    className={filterCompleted ? "is-active" : ""}
					onClick={() => applyFilter(true)}
                />
            </ul>
        </div>

    );

};

export default connect(mapStateToProps, mapDispatchToProps)(MenuTab);