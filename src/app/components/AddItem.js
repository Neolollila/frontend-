import React, { Component } from 'react';
import AppNavbar from "./AppNavbar";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import BackendService from "../services/BackendService";
import {withTranslation} from "react-i18next";

class AddItem extends Component {
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
        console.log(this.state.name);

        BackendService.addNewItem(this.props.match.params.id,{
            name: this.state.name
        })
            .then(response => {
                console.log('successfully created the collection');
                //this.props.history.push('/');
            }).catch(err=>{
                console.log(err);
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { t } = this.props;
        return(
            <div>
                <AppNavbar/>
                <div>
                    <div>
                        <Alert color="primary">
                            {t("Add_new_item!")}
                        </Alert>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleName">{t("Item_name")}</Label>
                                <Input onChange={this.handleChange} value={this.state.name}
                                       type="text" name="name" id="exampleName" />
                            </FormGroup>


                            <p><button type="submit" className="btn btn-primary">{t("Add_Item")}</button></p>
                        </Form>

                    </div>


                </div>
            </div>
        )
    }

}

export default withTranslation() (AddItem)