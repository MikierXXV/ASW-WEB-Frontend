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
                this.setState({
                    submissions: res.data,
                    loading: false
                });
            }
        );
    }


    render() {
        const { loading, submissions } = this.state;
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