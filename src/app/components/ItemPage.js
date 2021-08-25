import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
import BackendService from "../services/BackendService";
import {Alert, Form, FormGroup, Input, Label} from "reactstrap";

class ItemPage extends Component {

    constructor(props) {
        super(props);

        this.state={
            name: '',
            comment: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        BackendService.getItemById(this.props.match.params.idItem)
            .then( response => {
                    this.setState({
                        name: response.data.name
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

    }



    handleChange(e) {
        console.log(e.target.name,e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        return(
            <div>
                <AppNavbar/>
                <div>
                    <div>
                        <FormGroup>
                            <Label for="exampleName">Item name</Label>
                            <p name="name" id="exampleName" >{this.state.name}</p>
                        </FormGroup>


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