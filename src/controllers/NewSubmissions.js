import React, { Component } from "react";
import APIService from "../services/API";

import ListSubmissions from "../components/submissions/ListSubmissions";

class NewSubmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            submissions: []
        };
    }

    componentDidMount() {
        APIService.get('/news/newest/').then(
            response => {
                this.setState({
                    submissions: response.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
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

export default NewSubmissions;