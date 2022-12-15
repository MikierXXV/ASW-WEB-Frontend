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
        API.get('/profile/'+ this.props.match.params.id).then((res) => {
            this.setState({
                user: res.data,
                loading: false,
            });
        });
    }

   renderProfile(user){
        return (
            user.id === 3 ?
            <EditProfile user={user}/>
            : <ShowProfile user={user}/>
        )
   }

    render(){
        const { user, loading } = this.state;
        return(
            <div>
                loading ? (
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
                        <p>Loading</p>
                    </div>
                ) : (
                    this.renderProfile(user)
                )
            </div>
        );
    }
}

export default Profile;