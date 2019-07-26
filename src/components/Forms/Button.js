import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({type = "button", label, icon, className, onClick}) =>
{
	return (
		<button
			type	  = {type}
			className = {className}
			onClick	  = {onClick}>
			{
				icon ? <span className="icon"><FontAwesomeIcon icon={icon} /></span> : ""

			}
			{
				label ? <span>{label}</span> : ""

			}
		</button>

    )

};

export default Button;