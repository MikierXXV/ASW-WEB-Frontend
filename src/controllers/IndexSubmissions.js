import React, { Component } from "react";
import APIService from "../services/API";
import CircularProgress from '@material-ui/core/CircularProgress';

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
            response => {
                this.setState({
                    submissions: response.data.sort((a, b) => b.score -  a.score),
                    loading: false
                });
            }
        );
    }

    render() {
        const { loading, submissions } = this.state;
        return (
            loading ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                    <CircularProgress />
                </div>
                :
                <ListSubmissions submissions={ submissions } />
        );
    }
}

export default IndexSubmissions;