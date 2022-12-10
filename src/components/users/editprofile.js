import React, {Component} from "react";
import API from "../services/API";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Moment from "moment";

export default class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            user: props.user,
            errors: {},
            message: "",
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }

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
            //TODO: mirar path api put profile
            API.put("user").then((res) => {
                this.setState({
                    user: res.data,
                    errors: {},
                    message: res.data.message,
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
            <div>
                <Form onSubmit={this.handleUpdate} ref={c => {this.form = c;}}>
                    <table cellPadding="0" cellSpacing="0">

                    </table>
                </Form>
            </div>
        );
    }
}