import React, { Component } from "react";
import APIService from "../services/API";
import CircularProgress from '@material-ui/core/CircularProgress';

import ListContributions from "../components/submissions/ListSubmissions";

class UpvotedSubmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            submissions: []
        };
    }

    componentDidMount() {
        APIService.get('/profile/3/upvotedsubmits').then(
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
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                    <CircularProgress />
                </div>
                :
                <ListContributions submissions={ submissions } />
        );
    }
}

export default UpvotedSubmissions;