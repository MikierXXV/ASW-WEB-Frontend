import React, { Component } from "react";
import API from "../services/API";
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
        API.get('/profile/1').then((res) => {
            this.setState({
                user: res.data,
                loading: false,
            });
        });
    }

    render(){
        const { user, loading} = this.state;
        return(
            loading?
                <div className="d-flex justify-content-center mt-5" >
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> :
                user.id === 1 ? <EditProfile user={user}/> :
                    <ShowProfile user={user}/>
        );
    }
}

export default Profile;