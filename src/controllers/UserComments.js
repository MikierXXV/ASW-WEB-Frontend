import React, { Component } from "react";
import API from "../services/API";
//import ListComments form "../components/comments/ListComments";


class UserComments extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            loading: true,
        }
    }

    componentDidMount(){
        //let id = this.props.match.params.id !== undefined ? this.props.match.params.id : 1;
        API.get('/profile/1/thread').then((res) => {
            this.setState({
                comments: res.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
                loading: false,
            });
        });
    }

    render(){
        const { comments, loading} = this.state;
        console.log(comments);
        return(
            loading?
                <div className="d-flex justify-content-center mt-5" >
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div> : <div> Lista Comments</div>
            //<ListComments comments={comments}></ListComments>
        );
    }
}

export default UserComments;