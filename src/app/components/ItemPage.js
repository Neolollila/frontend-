import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
import BackendService from "../services/BackendService";
import {Alert, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader} from "reactstrap";

class ItemPage extends Component {

    constructor(props) {
        super(props);

        this.state={
            item: '',
            comment: '',
            comments: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getItemById();
        this.timerID = setInterval(
            () => this.getItemById(),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    getItemById () {
        BackendService.getItemById(this.props.match.params.idItem)
            .then( response => {
                    this.setState({
                        item: response.data,
                        comments: response.data.comments
                    });
                }, error => {
                    console.log(error);
                    this.setState({
                        error: error.toString()
                    });
                }
            )
    }

    handleSubmit(event) {
        event.preventDefault();

        BackendService.addComment( {
            text: this.state.comment,
            id_item: this.state.item.id
        })
            .then(response => {
                this.getItemById();
            })
            .catch(err=>{
            });
    }

    themesrow(){
        return this.state.comments.map((comment) =>
            <Toast>
                <ToastHeader>
                    {comment.id}
                </ToastHeader>
                <ToastBody>
                    {comment.text}
                </ToastBody>
            </Toast>
        );
    }

    handleChange(e) {
        console.log(e.target.name,e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    addLike(id) {

        BackendService.addLike(id)
            .then(response => {
                this.setState({
                    likesAmount: response.data
                })
            })
            .catch(err=>{
            });
    }

    render() {
        return(
            <div>
                <AppNavbar/>
                <div>
                    <div>
                        <div className="p-3 my-2 rounded bg-docs-transparent-grid">
                            <Toast>
                                <ToastHeader>
                                    Information about item:
                                </ToastHeader>
                                <ToastBody>
                                    Name:{this.state.item.name}

                                </ToastBody>
                                <button variant="dark" onClick={() => this.addLike(this.state.item.id)}>Like</button>
                                <span>{this.state.likesAmount}</span>
                            </Toast>
                        </div>
                        <div className="p-3 my-2 rounded">
                            <Label for="exampleName">Comments</Label>
                            {this.themesrow()}
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleName">Comments</Label>
                                <textarea class="form-control" onChange={this.handleChange} value={this.state.comment}
                                       name="comment" id="exampleComment" placeholder="Enter comment" />
                            </FormGroup>
                            <p><button type="submit" className="btn btn-primary">Send</button></p>


                        </Form>

                    </div>


                </div>
            </div>
        )
    }


}
export default ItemPage;