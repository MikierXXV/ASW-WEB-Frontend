import React, { Component } from "react";
import API from "../services/API";
import CircularProgress from "@material-ui/core/CircularProgress";


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            loading: true,
        }
    }

    componentDidMount(){
        API.get("user").then((res) => {
            this.setState({
                user: res.data,
                loading: false,
            });
        });
    }

    //TODO: modificar render adecuadamente
    render(){
        const { user, loading } = this.state;
        return(
            <div>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <div>
                        <h1>Profile</h1>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </div>
                )}
            </div>
        );
    }
}