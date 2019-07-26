import React from "react";

import Link from "../../../components/Screens/Link";
import Button from "../../../components/Forms/Button";
import TextInput from "../../../components/Forms/TextInput";

const SignIn = ({id = null, state, errors, onSubmit, onChange}) =>
{
    return (
        <form onSubmit={onSubmit}>
            <div className="field">
                <div className="control is-expanded">
                    <TextInput
                        id		    = "email"
						className   = "is-medium"
                        placeholder = "E-mail"
						value		= {state.email}
						onChange	= {onChange}
                        autoFocus	= {true}

                    />
					<p className="help is-danger">
						{errors.email}
						{errors.emailnotfound}
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
                            <Link
								to		  = "/"
								label 	  = "Cancel"
								className = "control button is-white"

                            />
                        </div>
                        <div className="level-item">
							<Button
								type 	  = "submit"
								label	  = "Sign In"
								className = "button is-link"

							/>
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

export default SignIn;