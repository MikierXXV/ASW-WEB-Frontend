import React, { Component } from "react";
import Comment from "../comments/Comment";

export default class RecursiveComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.comments !== prevProps.comments) {
            this.setState({
                comments: this.props.comments
            });
        }
    }

    renderComments(comments, margin = 'ml-3') {
        return (
            comments.map((comment) => {
                return (
                    <div key={ comment.id } className={ 'row ' + margin }>
                        <div className="col">
                            <Comment comment={ comment } on={false} />
                            { this.renderComments(comment.comments) }
                        </div>
                    </div>
                );
            })
        );
    }

    render() {
        const { comments } = this.state;

        return this.renderComments(comments, '');
    }
}