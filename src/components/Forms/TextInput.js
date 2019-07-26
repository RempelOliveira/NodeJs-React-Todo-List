import React from "react";

const TextInput = ({ type = "text", id, name, value, placeholder, className, autoFocus, onBlur, onChange }) =>
{
    return (
		<input
			id		    = {id}
			type	    = {type}
			className   = {"input " + className}
			name	    = {name}
			value	    = {value}
			placeholder = {placeholder}
			onBlur		= {onBlur}
			onChange	= {onChange}
			autoFocus	= {autoFocus}

		/>

    );

};

export default TextInput;