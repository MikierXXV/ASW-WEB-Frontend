import React, { Component } from "react";
import API from "../services/API";
import ListSubmissions from "../components/submissions/ListSubmissions";


class UserSubmissions extends Component{
    constructor(props){
        super(props);
        this.state = {
            submissions: props.submissions,
            loading: true,
        }
    }

    componentDidMount(){
        API.get('/profile/1/submissions/').then((res) => {
            this.setState({
                submissions: res.data,//.results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
                loading: false,
            });
        });
    }

    render(){
        const { submissions, loading} = this.state;
        console.log(submissions);
        return(
            loading?
                <div className="d-flex justify-content-center mt-5" >
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div> :
                <ListSubmissions submissions={submissions}></ListSubmissions>

        );
    }
}

export default UserSubmissions;