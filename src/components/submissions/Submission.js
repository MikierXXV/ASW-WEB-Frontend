import React, { Component } from "react";
import Moment from "moment";
import APIService from "../../services/API";

export default class Submission extends Component {
    constructor(props) {
        super(props);
        this.onClickVote = this.onClickVote.bind(this);
        this.onClickUnvote = this.onClickUnvote.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);

        this.state = {
            submission: props.submission,
            index: props.index === undefined ? false : props.index,
            deleteButton: props.deleteButton === undefined ? true : props.deleteButton,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.submission !== prevProps.submission) {
            this.setState({
                submission: this.props.submission
            });
        }
    }

    onClickDelete() {
        APIService.delete('/news/' + this.state.submission.id + '/').then(
            response => {
                    window.location.reload();
            }
        );
    }

    onClickUnvote() {
        APIService.delete('/news/' + this.state.submission.id + '/vote/').then(
            response => {
                this.setState({
                    submission: response.data,
                });
            }
        );
    }

    onClickVote() {
        APIService.post('/news/' + this.state.submission.id + '/vote/').then(
            response => {
                this.setState({
                    submission: response.data,
                });
            }
        );
    }

    renderStatus(status) {
        const htmlStatus = {
            voted: <span className="titleUser mr-1">&nbsp;&nbsp;&nbsp;&nbsp;</span>,
            unvoted: <div className="title clickable mr-1" onClick={this.onClickVote}>▲</div>,
            owner: <span className="titleUser">&nbsp;*&nbsp;&nbsp;</span>
        };
        return htmlStatus[status];
    }

    render() {
        const {index, submission, deleteButton} = this.state;
        return (
            <table>
                <tbody>
                <tr>
                    {index ?
                        <td className="title">{index}.</td>
                        :
                        <td></td>
                    }
                    <td>
                        {this.renderStatus(submission.status)}
                    </td>
                    <td className="title">
                        <a
                            className="link"
                            href={
                                submission.type === 'url' ?
                                    submission.url
                                    :
                                    '/comment' + submission.id + '/'
                            }>
                            {submission.title}
                        </a>
                        &nbsp;
                        {submission.type === 'url' &&
                            <span className="yclinks">
                  ({new URL(submission.url).hostname})
                </span>
                        }
                    </td>
                </tr>
                <tr>
                    <td colSpan="2"></td>
                    <td className="subtext">
              <span className="subtext">
                {submission.votes + ' points by '}
              </span>
                        <a className="subtext" href={'/profile/' + submission.author.id}>
                            {submission.author.username}
                        </a>
                        &nbsp;
                        <a className="subtext" href={'/comment' + submission.id + '/'}>
                            {Moment(submission.created_at).fromNow()}
                        </a>
                        &nbsp;
                        {submission.status === 'voted' &&
                            <>
                                <span className="subtext">|</span>
                                &nbsp;
                                <span className="subtext clickable" onClick={this.onClickUnvote}>unvote</span>
                                &nbsp;
                            </>
                        }
                        {submission.status === 'owner' &&
                            <>
                                <span className="subtext">|</span>
                                &nbsp;
                                <a className="subtext" href={'/news/' + submission.id + '/edit'}>edit</a>
                                &nbsp;
                                {deleteButton &&
                                    <>
                                        <span className="subtext">|</span>
                                        &nbsp;
                                        <span className="subtext clickable" onClick={this.onClickDelete}>delete</span>
                                        &nbsp;
                                    </>
                                }
                            </>
                        }
                        <span className="subtext">|</span>&nbsp;
                        <a className="subtext" href={'/comment' + submission.id + '/'}>
                            {submission.comments + ' comments'}
                        </a>
                    </td>
                </tr>
                <tr id="pagespace" style={{height: '10px'}}></tr>
                </tbody>
            </table>
        );
    }
}