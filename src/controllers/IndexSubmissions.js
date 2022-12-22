import React, { Component } from "react";
import APIService from "../services/API";

import ListSubmissions from "../components/submissions/ListSubmissions";

class IndexSubmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            submissions: []
        };
    }

    componentDidMount() {
        APIService.get('/news/').then(
           (res) => {
               console.log(res.data);
                this.setState({
                    submissions: res.data.results.sort((a, b) => a.votes - b.votes),//.results.sort((a, b) => b.points -  a.points),
                    loading: false
                });
            }
        );
    }


    render() {
        const { loading, submissions } = this.state;
        //console.log(submissions);
        return (
            loading ?
                <div className="d-flex justify-content-center mt-5" >
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                :
                <ListSubmissions submissions={ submissions } />
        );
    }
}

export default IndexSubmissions;