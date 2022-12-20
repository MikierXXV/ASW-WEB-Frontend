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
            //loading: true,
        }
    }

    componentDidMount(){
        API.get('/profile/3').then((res) => {
            this.setState({
                user: res.data,
                //loading: false,
            });
        });
    }

    render(){
        const { user, loading} = this.state;
        return(
            loading?
                <div className="d-flex justify-content-center" style="width: 3rem; height: 3rem;">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> :
                user.id === 3 ? <EditProfile user={user}/> :
                    <ShowProfile user={user}/>
        );
    }
}

export default Profile;