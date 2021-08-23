import React, {Component} from 'react';
import {Alert} from "reactstrap";
import BackendService from "../services/BackendService";
import AppNavbar from "./AppNavbar";

class TableItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();


        BackendService.getItemByCollectionId(this.props.match.params.id,{
            name: this.state.name
        })
            .then(response => {
                console.log(response.data);
                //this.props.history.push('/');
            }).catch(err=>{
            console.log(err);
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        return(
            <div>
                <AppNavbar/>
                <Alert color="primary">
                    Item table:
                </Alert>
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Name Item</th>
                        <th>Tag</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td>
                            <div>
                                <button type="button" className="btn btn-info">Block</button>
                                <button type="button" className="btn btn-danger" >Delete</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableItem;