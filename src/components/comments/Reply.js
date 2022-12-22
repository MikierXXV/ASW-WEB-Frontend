import React, { Component } from "react";
import Comment from "./Comment";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import APIService from "../../services/API";

export default class Reply extends Component {
    constructor(props) {
        super(props);
        this.handleReply = this.handleReply.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.state = {
            loading: true,
            text: '',
            comment: {},
            errors: {}
        };
    }

    componentDidMount() {
        APIService.get('/comments/' + this.props.match.params.id).then(
            response => {
                this.setState({
                    comment: response.data,
                    loading: false,
                });
            }
        );
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleReply(e) {
        e.preventDefault();

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            APIService.post('/comments/' + this.state.comment.id +'/comments', {
                text: this.state.text
            }).then(
                response => {
                    this.props.history.push('/comment/' + response.data.parent_contribution.id);
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
        const { comment, errors, text, loading } = this.state;
        return (
            loading ?
                <div className="d-flex justify-content-center mt-5" >
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                :
                <div className="ml-2">
                    <div className="ml-3">
                        <Comment comment={ comment } reply={false} deleteButton={false} />
                    </div>
                    <div className="col-6 mt-3">
                        <Form onSubmit={ this.handleReply } ref={ c => { this.form = c; } }>
                            <div className="form-group">
                  <textarea
                      name="text"
                      className="form-control"
                      rows="4"
                      value={ text }
                      onChange={ this.onChangeText }
                  />
                                { errors['text'] &&
                                    <div className="alert alert-danger">{ errors['text'] }</div>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary-mine">reply</button>
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {this.checkBtn = c;}}
                            />
                        </Form>
                    </div>
                </div>
        );
    }
}