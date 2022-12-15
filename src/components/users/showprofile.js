import React, { Component } from "react";
import Moment from "moment";

export default class ShowProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        }
    }

    render(){
        const { user } = this.state;
        return(
            <div className="col-4">
                <table cellPadding="0" cellSpacing="0">
                    <tbody className="default">
                    <tr className="default">
                        <td valign="top">User:</td>
                        <td>
                            <a className="default" href={'/profile/'+ user.id}>
                                { user.username }
                            </a>
                        </td>
                    </tr>
                    <tr className="default">
                        <td valign="top">Created:</td>
                        <td>
                            <div className="default">
                                { Moment(user.created_at).fromNow() }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <a className="pagetop" href={'profile/'+ user.id + '/submissions'}>
                                <u>submissions</u>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <a className="pagetop" href={'profile/'+ user.id + '/comments'}>
                                <u>comments</u>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}