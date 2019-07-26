import React, { Fragment } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Link from "../components/Screens/Link";

const PageNotFound = () =>
{
	return (
		<Fragment>
			<div className="message is-danger is-marginless">
				<div className="message-header">
					<span className="title is-7">404 HTTP Error - Page not found!</span>
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

	);

};

export default withRouter(connect(null, null)(PageNotFound));