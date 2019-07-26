import React, { Fragment } from "react";
import Numeral from "numeral";

import Link from "../../../components/Screens/Link";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import FileInputExcel from "../../../components/Forms/FileInputExcel";

const FormUpload = ({state, errors, onSubmit, onChange, onCancel}) =>
{
    return (
        <form onSubmit={onSubmit}>

			<div className="field">
				<div className="file is-boxed is-medium is-centered">
					<FileInputExcel
						id		    = "excel"
						className   = "file-input"
						value		= {state.excel}
						onChange	= {onChange}

					/>
				</div>
			</div>
			<div className="is-divider" data-content=""></div>
			{
				state.excel
					?
						<Fragment>
							<div className="field">
								<label className="label">
									File
								</label>
								{state.excel.name}
							</div>
							<div className="field">
								<label className="label">
									Size
								</label>
								{Numeral(state.excel.size).format("0 b")}
							</div>
						</Fragment>
					:
						""
			}
            <div className="field">
                <div className="level">
                    <div className="level-left">
                        
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <Link
								to 		  = "/"
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
								Upload
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

export default FormUpload;