import React, {Component} from "react";
import API from "../../services/API";
import Form from "react-validation/build/form";
//import input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Moment from "moment";
import {BiUser} from "react-icons/bi";
import {BsCalendar} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";
import {MdOutlineDescription} from "react-icons/md";
import {BsKey} from "react-icons/bs";
class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAbout = this.onChangeAbout.bind(this);

        this.state = {
            user: props.user,
            errors: {},
            message: "",
        }
    }
    onChangeEmail(value){
        this.setState({
            email: value,
        });
    }

    onChangeAbout(value){
        this.setState({
            about: value,
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
            API.put('/profile/' + this.state.user.id + '/').then((res) => {
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
        console.log(user);
        return(
            <div className="col -6 mt-2">
                <Form onSubmit={this.handleUpdate} ref={c => {this.form = c;}}>
                    <table cellPadding="0" cellSpacing="0">
                        <tbody className="default">
                            <tr className="default">
                                <td valign="top">
                                    <BiUser size="25px" className="mr-2" ></BiUser>
                                    User:
                                </td>
                                <td>
                                    <div className="default">{user.username}</div>
                                </td>
                            </tr>
                            <tr style={{height: "10px"}}></tr>
                            <tr className="default">
                                <td valign="top">
                                    <BsCalendar size="25px" className="mr-2"></BsCalendar>
                                    Created:
                                </td>
                                <td>
                                    <div className="default ml-2">{Moment(user.date_joined).fromNow()}</div>
                                </td>
                            </tr>
                            <tr style={{height: "20px"}}></tr>
                            <tr className="default">
                                <td valign="top">
                                    <AiOutlineMail size="25px" className="mr-2" ></AiOutlineMail>
                                    Email:</td>
                                <td>
                                    <input type="text" className="form-control" size="60" name="email"
                                           value={user.email} onChange={ e =>this.onChangeEmail(e.target.value)}/>
                                    {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                                </td>
                            </tr>
                            <tr style={{height: "10px"}}></tr>
                            <tr className="default">
                                <td valign="top" >
                                    <MdOutlineDescription className="mr-2" size="25px" ></MdOutlineDescription>
                                    About:</td>
                                <td>
                                    <textarea type="text-area" className="form-control" size="60" name="email"
                                           value={user.about} onChange={e => this.onChangeAbout(e.target.value)}/>
                                    {errors.about && <div className="alert alert-danger">{errors.about}</div>}
                                </td>
                            </tr>
                            <tr style={{height: "20px"}}></tr>
                            <tr className="default">
                                <td valign="top">
                                    <BsKey size="25px" className="mr-2"></BsKey>
                                    APIkey:</td>
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
                                        <u>upvoted comments</u>
                                    </a>
                                    {' (private)'}
                                </td>
                            </tr>
                            <tr style={{height: "20px"}}></tr>
                            <tr>
                                <td>
                                    <button type={"submit"} className="btn-primary-mine">Update</button>
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