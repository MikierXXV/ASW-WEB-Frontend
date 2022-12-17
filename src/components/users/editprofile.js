import React, {Component} from "react";
import API from "../../services/API";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Moment from "moment";

class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        //this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            user: props.user,
            errors: {},
            message: "",
        }
    }

    /*onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }*/

    onChangeEmail(e){
        this.setState({
            email: e.target.value,
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value,
        });
    }

    handleUpdate(e){
        e.preventDefault();

        this.setState({
            message: "",
            errors: {},
        });

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){
            API.put('/profile/' + this.state.user.id ).then((res) => {
                this.setState({
                    user: res.data,
                    errors: {},
                    message: 'Updated successfully',
                });
            }).catch((err) => {
                this.setState({
                    errors: err.response.data.errors,
                    message: '',
                });
            });
        }
    }

    render(){
        const { user, errors, message } = this.state;
        return(
            <div className="col -6 mt-2">
                <Form onSubmit={this.handleUpdate} ref={c => {this.form = c;}}>
                    <table cellPadding="0" cellSpacing="0">
                        <tbody className="default">
                            <tr className="default">
                                <td valign="top">User:</td>
                                <td>
                                    <div className="default">{user.username}</div>
                                </td>
                            </tr>
                            <tr className="default">
                                <td valign="top">Created:</td>
                                <td>
                                    <div className="default">{Moment(user.date_joined).fromNow()}</div>
                                </td>
                            </tr>
                            <tr className="default">
                                <td valign="top">Email:</td>
                                <td>
                                    <Input type="text" className="form-control" size="60" name="email"
                                           value={user.email} onChange={this.onChangeEmail}/>
                                    {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                                </td>
                            </tr>
                            <tr className="default">
                                <td valign="top">About:</td>
                                <td>
                                    <Input type="text-area" className="form-control" size="60" name="email"
                                           value={user.description} onChange={this.onChangeDescription}/>
                                    {errors.description && <div className="alert alert-danger">{errors.description}</div>}
                                </td>
                            </tr>
                            <tr className="default">
                                <td valign="top">APIkey:</td>
                                <td>
                                    <div className="default">{"6qFP{8$X(k/Z#gV@JL`:?q%@y5WcGy7F"}</div>
                                </td>
                            </tr>
                            <tr style={{height: "20px"}}></tr>
                            <tr>
                                <td></td>
                                <td>
                                    <a className="pagetop" href={'/profile/'+ user.id + '/submissions'}>
                                        <u>submissions</u>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <a className="pagetop" href={'/profile/'+ user.id + '/thread'}>
                                        <u>comments</u>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <a className="pagetop" href={'/profile/'+ user.id + '/upvotedsubmissions'}>
                                        <u>upvoted submissions</u>
                                    </a>
                                    {' / '}
                                    <a className="pagetop" href={'/profile/'+ user.id + '/upvotedcomments'}>
                                        <u>upvoted submissions</u>
                                    </a>
                                    {'(private)'}
                                </td>
                            </tr>
                            <tr style={{height: "20px"}}></tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type={"submit"} className="btn btn-primary-mine">Update</button>
                                    <div className={"m-2 p-0 alert"}>{message}</div>
                                    <CheckButton style={{display: "none"}} ref={c => {this.checkBtn = c;}}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </div>
        );
    }
}

export default EditProfile;