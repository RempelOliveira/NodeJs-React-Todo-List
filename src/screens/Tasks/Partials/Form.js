import React, { Fragment } from "react";

import Link from "../../../components/Screens/Link";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import TextInput from "../../../components/Forms/TextInput";
import TextAreaInput from "../../../components/Forms/TextAreaInput";

const Form = ({id, state, errors, onSubmit = "", onChange = ""}) =>
{
    return (
		<Fragment>
			{
				errors.general
					?
						<Fragment>
							<div className="message is-danger is-marginless">
								<div className="message-header">
									<span className="title is-7">{errors.general}</span>
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
						<form onSubmit={onSubmit}>
							<div className="field">
								<div className="control is-expanded">
									<TextInput
										id		    = "title"
										className   = "is-medium"
										placeholder = "Task Title"
										value		= {state.title}
										onChange	= {onChange}
										autoFocus	= {true}

									/>
									<p className="help is-danger">
										{errors.title}
									</p>
								</div>
							</div>
							<div className="field">
								<label className="label">
									Details&nbsp;
									<span className="has-text-weight-light">
										- Optional
									</span>
								</label>
								<div className="control">
									<TextAreaInput
										id		  = "details"
										className = "textarea is-shadowless"
										value	  = {state.details}
										onChange  = {onChange}

									/>
								</div>
							</div>
							<div className="field">
								<label className="label">
									Remember me at&nbsp;
									<span className="has-text-weight-light">
										- Optional
									</span>
								</label>
								<div className="control">
									<TextInput
										id		  = "remember_me_date"
										type	  = "date"
										className = "input fit-content is-shadowless"
										value	  = {state.remember_me_date}
										onChange  = {onChange}

									/>
								</div>
							</div>
							<div className="field">
								<div className="level">
									<div className="level-left">
										{
											id
												?
													<Link
														to		  = {`../delete/${id}`}
														label	  = "Delete"
														className = "button is-danger"
													/>
												:
											""
										}
									</div>
									<div className="level-right">
										<div className="level-item">
											<Link
												to		  = "/"
												label 	  = "Cancel"
												className = "control button is-white"

											/>
										</div>
										<div className="level-item">
											<LaddaButton
												type			   = "submit"
												loading			   = {state.loading}
												data-style		   = {ZOOM_OUT}
												data-spinner-color = "#fff"

											>
												{id ? "Update" : "Create"}
											</LaddaButton>
										</div>
									</div>
								</div>
							</div>
						</form>

			}
		</Fragment>

    );

};

export default Form;