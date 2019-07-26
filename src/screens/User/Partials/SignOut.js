import React from "react";

import Link from "../../../components/Screens/Link";
import Button from "../../../components/Forms/Button";

const SignOut = ({onClick}) =>
{
    return (
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
						<Button
							label	  = "Yes"
							className = "button is-link"
							onClick   = {onClick}

						/>
					</div>
				</div>
			</div>
		</div>

    );

};

export default SignOut;