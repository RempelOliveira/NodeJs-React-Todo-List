import React, { Fragment, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FileInput extends Component
{
	constructor()
	{
		super();

		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(event)
	{
		event.persist();
		event.preventDefault();

		if(event.target.files.length)
		{
			let file   = event.target.files[0];
			let reader = new FileReader();

			reader.onloadend = () =>
			{
				if(event.target)
					this.props.onChange(event, file, reader.result);

			}

			reader.readAsDataURL(file);

		}

	}

	render()
	{
		return (
			<label className="file-label">
				<input
					id		    = {this.props.id}
					className   = {this.props.className}
					onChange	= {this.handleChange}
					type 	 	= "file"

				/>
				<span className="file-cta">
					<Fragment>
						<span className="file-icon">
							<FontAwesomeIcon icon={["fas", "user-circle"]} />
						</span>
						<span className="file-label">
							Avatar image...
						</span>
					</Fragment>
				</span>
			</label>

		);

	}

}

export default FileInput;