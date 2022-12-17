import React, { Component } from "react";
import API from "../services/API";
//import CircularProgress from "@material-ui/core/CircularProgress";
import EditProfile from "../components/users/editprofile";
import ShowProfile from "../components/users/showprofile";


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            loading: true,
        }
    }

    componentDidMount(){
        API.get('/profile/' + this.props.user.id).then((res) => {
            this.setState({
                user: res.data,
                loading: false,
            });
        });
    }

    render(){
        const { user, loading} = this.state;
        return(
            loading? <div></div> :
                user.id === 3 ? <EditProfile user={user}/> :
                    <ShowProfile user={user}/>
        );
    }
}

export default Profile;