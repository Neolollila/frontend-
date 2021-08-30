import React, {Component} from "react";
import AppNavbar from "../collection elements/AppNavbar";
import {Alert, Form, FormGroup, Input, Label} from "reactstrap";
import BackendService from "../services/BackendService";
import {withTranslation} from "react-i18next";


class EditItems extends Component{

    constructor(props) {
        super(props);

        this.state={
            name: '',
            fieldItems: [],
            types: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        BackendService.getItemById(this.props.match.params.idItem)
            .then( response => {
                this.setState({
                    name: response.data.name,
                    fieldItems: response.data.fielditems
                });

            }, error => {
                    console.log(error);
                    this.setState({
                        error: error.toString()
                    });
                }
            )
        BackendService.getTypeList()
            .then( response => {
                this.setState({
                    types: response.data
                })
            } , error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });

    }

    handleSubmit(event) {
        event.preventDefault();

        BackendService.editItem(this.props.match.params.idItem, {
            name: this.state.name,
            fieldItems: this.state.fieldItems
        })
            .then(response => {
                this.props.history.push(`/editCollection/${this.props.match.params.id}/tableItem`);
            })
            .catch(err=>{});
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleText = i => e => {

        let fieldItems = [...this.state.fieldItems]
        fieldItems[i][e.target.name] = e.target.value
        this.setState({
            fieldItems
        });
    }

    handleIdType = i => e => {
        let fieldItems = [...this.state.fieldItems]
        fieldItems[i]["idType"] = e.target.value
        this.setState({
            fieldItems
        });
    }

    handleDelete = i => e => {
        e.preventDefault()
        this.removeById(this.state.fieldItems[i].id);
        let fieldItems = [
            ...this.state.fieldItems.slice(0, i),
            ...this.state.fieldItems.slice(i + 1)
        ]
        this.setState({
            fieldItems
        })
    }

    addQuestion = e => {
        e.preventDefault()
        let fieldItemsArr = this.state.fieldItems; //push({ name: "", value: "",idType : 1 })
        fieldItemsArr.push({ name: "", value: "",idType : 1 });

        this.setState({
            fieldItems: fieldItemsArr
        })
    }

    inp() {
        return (
            <div>
                <div >
                    {this.state.fieldItems.map((fieldItem, index) => (
                        <div className="row" key={index}>
                            <div className="form-group col-md-5">
                                 <input
                                     type="text"
                                     name="name"
                                     required
                                     className="form-control"
                                     placeholder="name"
                                     onChange={this.handleText(index)}
                                     value={fieldItem.name}
                                 />
                            </div>
                            <div className="form-group col-md-5">
                                <input
                                    type="text"
                                    name="value"
                                    required
                                    className="form-control"
                                    placeholder="value"
                                    onChange={this.handleText(index)}
                                    value={fieldItem.value}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <button className="btn btn-danger"
                                    onClick={this.handleDelete(index)}>X</button>
                            </div>
                            <div className="form-group">
                                    <select style={{visibility: 'hidden'}} className="form-control" onChange={this.handleIdType(index)} value={fieldItem.idType} name="idType">
                                        {this.typeslist()}
                                    </select>

                            </div>

          </div>

                    ))}
                    <button style={{visibility: 'hidden'}} onClick={this.addQuestion} className="btn btn-success">Add New Field</button>
                </div>
            </div>

        );
    }
    typeslist(){
        return this.state.types.map((type) =>
            <option key={type.id} value={type.id} >{type.name}</option>
        );
    }

    removeById(id) {
        BackendService.removeFieldItemById(id)
            .then( response => {
            });
    }
    render() {
        const { t } = this.props;
        return(
            <div>
                <AppNavbar/>
                <main>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-12">
                                <Alert color="primary">
                                    {t("Edit_item")}!
                                </Alert>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="exampleName">{t("Item_name")}</Label>
                                        <Input onChange={this.handleChange} value={this.state.name}
                                               type="text" name="name" id="exampleName"  required/>
                                    </FormGroup>
                                    <p><button type="submit" className="btn btn-primary">{t("Save_changes")}</button></p>
                                </Form>
                                {this.inp()}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}

export default withTranslation() (EditItems)