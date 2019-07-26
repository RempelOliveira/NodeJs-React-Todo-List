import React, { Component } from "react";
import { setAuthentication, signInUserSuccess } from "../actions/User";

import jwt_decode from "jwt-decode";
import store from "../store";

import Box from "../components/Screens/Box";

if(localStorage.jwtToken)
{
	const decoded 	  = jwt_decode(localStorage.jwtToken);
	const currentTime = Date.now() / 1000;

	if(decoded.exp >= currentTime)
	{
		setAuthentication(localStorage.jwtToken);
		store.dispatch(signInUserSuccess(decoded));

	}
	else
		setAuthentication();

}

class AppLayout extends Component
{
    render()
	{
        return (
            <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-half is-offset-one-quarter">
                                <Box />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );

    };

};

export default AppLayout;