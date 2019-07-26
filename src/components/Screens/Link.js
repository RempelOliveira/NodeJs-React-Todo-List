import React from "react";

import { Link as ReactLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Link = ({to, label, icon, className}) =>
{
    return (
		<ReactLink to={to} className={className}>
			{
				icon ? <span className="icon"><FontAwesomeIcon icon={icon} /></span> : ""

			}
			<span>{label}</span>
		</ReactLink>

    );

};

export default Link;