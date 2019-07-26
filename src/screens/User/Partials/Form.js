import React, { Fragment } from "react";
import Numeral from "numeral";

import Button from "../../../components/Forms/Button";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import FileInput from "../../../components/Forms/FileInput";
import TextInput from "../../../components/Forms/TextInput";

const Form = ({id = null, state, errors, onSubmit, onChange, onCancel}) =>
{
    return (
        <form onSubmit={onSubmit}>

			<div className="field">
				<div className="file is-boxed is-medium is-centered">
					<FileInput
						id		    = "avatar"
						className   = "file-input"
						value		= {state.avatar}
						onChange	= {onChange}

					/>
				</div>
			</div>
			<div className="is-divider" data-content=""></div>
			{
				typeof state.avatar == "object"
					?
						<Fragment>
							<div className="field">
								<label className="label">
									File
								</label>
								{state.avatar.name}
							</div>
							<div className="field">
								<label className="label">
									Size
								</label>
								{Numeral(state.avatar.size).format("0 b")}
							</div>
							<div className="is-divider" data-content=""></div>
						</Fragment>
					:
						""
			}
            <div className="field">
                <div className="control is-expanded">
                    <TextInput
                        id		    = "name"
						className   = "is-medium"
                        placeholder = "Name"
						value		= {state.name}
						onChange	= {onChange}
                        autoFocus	= {true}

                    />
					<p className="help is-danger">
						{errors.name}
					</p>
                </div>
            </div>
            <div className="field">
                <div className="control is-expanded">
                    <TextInput
                        id		    = "email"
						className   = "is-medium"
                        placeholder = "E-mail"
						value		= {state.email}
						onChange	= {onChange}

                    />
					<p className="help is-danger">
						{errors.email}
					</p>
                </div>
            </div>
            <div className="field">
                <div className="control is-expanded">
                    <TextInput
                        id		    = "password"
						type		= "password"
						className   = "is-medium"
                        placeholder = "Password"
						value		= {state.password}
						onChange	= {onChange}

                    />
					<p className="help is-danger">
						{errors.password}
						{errors.passwordincorrect}
					</p>
                </div>
            </div>
            <div className="field">
                <div className="level">
                    <div className="level-left">
                        
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <Button
								label 	  = "Cancel"
								className = "control button is-white"
								onClick	  = {onCancel}

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
			{
				errors.general
					?
						<div className="message is-danger">
							<div className="message-header">
								<span className="title is-7">{errors.general}</span>
							</div>
						</div>
					:
						""
			}
        </form>

    );

};

export default Form;