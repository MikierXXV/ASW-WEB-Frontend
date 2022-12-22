import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import APIService from "../../services/API";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class EditSubmission extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.state = {
            loading: true,
            submission: {},
            title: '',
            url: '',
            text: '',
            errors: {}
        };
    }

    componentDidMount() {
        APIService.get('/news/' + this.props.match.params.id + '/').then(
            response => {
                this.setState({
                    submission: response.data,
                    title: response.data.title,
                    url: response.data.url,
                    text: response.data.text,
                    loading: false,
                });
            }
        );
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        });
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
            APIService.put('/news/' + this.state.submission.id + '/',{
                title: this.state.title,
                url: this.state.url,
                text: this.state.text
            }).then(
                response => {
                    this.props.history.push('/comment' + response.data.id + '/');
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
        const { title, url, text, errors, submission, loading } = this.state;

        return ( loading ?
                <div className="d-flex justify-content-center mt-5" >
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                :
                <div className="col-8 mt-2">
                    <Form onSubmit={ this.handleUpdate } ref={ c => { this.form = c; } } >
                        <div className="form-group">
                            <strong>Title</strong>
                            <Input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Title"
                                value={title}
                                onChange={this.onChangeTitle}
                            />
                            { errors['title'] && (
                                <div className="alert alert-danger">{ errors['title'] }</div>
                            )}
                        </div>
                        { submission.type === 'url' &&
                            <div className="form-group">
                                <strong>Url</strong>
                                <Input
                                    type="text"
                                    name="url"
                                    className="form-control"
                                    placeholder="Url"
                                    value={url}
                                    onChange={this.onChangeUrl}
                                />
                                { errors['url'] && (
                                    <div className="alert alert-danger">{ errors['url'] }</div>
                                )}
                            </div>
                        }
                        { submission.type === 'ask' &&
                            <div className="form-group">
                                <strong>Text</strong>
                                <textarea
                                    name="text"
                                    className="form-control"
                                    placeholder="Text"
                                    value={text}
                                    rows="4"
                                    onChange={this.onChangeText}
                                />
                                { errors['text'] && (
                                    <div className="alert alert-danger">{ errors['text'] }</div>
                                )}
                            </div>
                        }

                        <button type="submit" className="btn btn-primary-mine">Update</button>

                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
        );
    }
}
