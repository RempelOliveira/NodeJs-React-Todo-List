import React from "react";

import Button from "../Forms/Button";

const Tab = ({text, quantity, className, onClick}) =>
{
	return (
        <li
			className = {className}
			onClick   = {onClick}>
				<Button
				
					className = "button button-link is-white has-text-black"
					label	  =
					{
						<span>{text} &nbsp; <span className="tag is-dark is-rounded is-small">{quantity}</span></span>

					}

				/>
        </li>

    );

};

export default Tab;