import React, { Component } from "react";
import APIService from "../../services/API";
import Moment from "moment";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.onClickVote = this.onClickVote.bind(this);
        this.onClickUnvote = this.onClickUnvote.bind(this);
//        this.onClickDelete = this.onClickDelete.bind(this);
//        this.onClickEdit = this.onClickEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.state = {
            //edit: false,
            text: props.comment.text,
            errors: {},
            comment: props.comment,
            on: props.on === undefined ? true : props.on,
            reply: props.reply === undefined ? true : props.reply,
            deleteButton: props.deleteButton === undefined ? true : props.deleteButton
        };
    }
    /*onClickEdit() {
    this.setState({
        edit: !this.state.edit
    });
}

onClickDelete() {
    APIService.delete('/comments/' + this.state.comment.id).then(
        response => {
            window.location.reload()
        }
    );
}*/

    onClickUnvote() {
        APIService.delete('/comment' + this.state.comment.id + '/votes').then(
            response => {
                this.setState({
                    comment: response.data,
                });
            }
        );
    }

    onClickVote() {
        APIService.post('/comment' + this.state.comment.id + '/votes').then(
            response => {
                this.setState({
                    comment: response.data,
                });
            }
        );
    }

    renderStatus(status) {
        const htmlStatus = {
            voted: <div className="titleUser mr-1">&nbsp;&nbsp;&nbsp;&nbsp;</div>,
            unvoted: <div className="title clickable mr-1" onClick={ this.onClickVote }>▲</div>,
            owner: <span className="titleUser">&nbsp;*&nbsp;&nbsp;</span>
        };
        return htmlStatus[status];
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleUpdate(e) {
        e.preventDefault();

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            APIService.post('/comment', {
                text: this.state.text
            }).then(
                response => {
                    this.setState({
                        comment: response.data,
                        text: response.data.text,
                        //edit: false
                    });
                },
                error => {
                    this.setState({
                        errors: error.response.data.errors
                    });
                }
            )
        }
    }

    render() {
        const { comment, on, reply, text, errors} = this.state;
        return(
            <table>
                <tbody>
                <tr>
                    <td>
                        <table cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                <td>
                                    { this.renderStatus(comment.status) }
                                </td>
                                <td>
                                    <a className="yclinks" href={ '/profile/' + comment.user.id }>{ comment.user.username }</a>&nbsp;
                                    <span className="subtext">
                        { Moment(comment.created_at).fromNow() + ' ' }
                      </span>
                                    { comment.status === 'voted' &&
                                        <>
                                            <span className="subtext">|</span>
                                            &nbsp;
                                            <span className="subtext clickable" onClick={ this.onClickUnvote } >unvote</span>
                                            &nbsp;
                                        </>
                                    }
                                    { comment.status === 'owner' &&
                                        <>
                                            <span className = "subtext">|</span>
                                            &nbsp;
                                        </>
                                    }
                                    { on &&
                                        <>
                                            <span className = "yclinks">| on: </span>
                                            <a className="yclinks" href={ '/comment' + comment.parent_contribution.id }>{ comment.parent_contribution.title }</a>
                                        </>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="1"></td>
                                <td className="comment">
                                    {
                                        comment.text
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="1"></td>
                                <td>
                                    { reply &&
                                        <a className="subtextB" href={ '/reply/' + comment.id }>reply</a>
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}