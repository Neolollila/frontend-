import AppNavbar from './AppNavbar';
import React, { Component } from 'react';
import {Alert, Container} from 'reactstrap';
import BackendService from '../services/BackendService';
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {withTranslation} from "react-i18next";
import UploadImages from "../dragonDrop/uploadImage";


class EditCollectionn extends Component {

    constructor(props) {
        super(props);

        this.state={
            themes: [],
            collection:'',
            name: '',
            description: '',
            image:'',
            theme: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        BackendService.getThemeList()
            .then( response => {
                this.setState({
                    themes: response.data
                })
            } , error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });

        BackendService.getCollectionById(this.props.match.params.id)
            .then( response => {
                console.log(response.data);
                this.setState({
                    collection: response.data,
                    name: response.data.name,
                    description: response.data.description,
                    theme: response.data.theme.id,
                    image: response.data.image,
                });
            } , error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        let linkImg = '';
        let imageFile = document.getElementById("imageFile");
        if(imageFile.files.length > 0){
            linkImg = document.getElementById("imageCollection").src;
        }
        else {
            document.getElementById("previu").src = "";
        }

        BackendService.editCollection(this.props.match.params.id, {
            name: this.state.name,
            image: linkImg,//this.fileInput,
            theme: this.state.theme,
            description: this.state.description
        })
            .then(response => {
                console.log('successfully created the collection');
                this.props.history.push('/');
                })
            .catch(err=>{
        });
    }

    handleChange(e) {
        console.log(e.target.name,e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    themesrow(){
        return this.state.themes.map((themes) =>
            <option key={themes.id} value={themes.id} >{themes.name}</option>
        );
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <AppNavbar/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <Form onSubmit={this.handleSubmit}>
                    <Alert color="primary">
                        {t("Edit_collection")}
                    </Alert>
                    <FormGroup>
                        <Label for="exampleName">{t("Collection_name")}</Label>
                        <Input onChange={this.handleChange} value={this.state.name}
                               type="text" name="name" id="exampleName" placeholder="Enter collection name" />
                    </FormGroup>
                    <div className="form-group">
                        <Label for="exampleTheme">{t("Select_collection_theme")}</Label>
                        <select className="form-control" onChange={this.handleChange} value={this.state.theme} name="theme" id="theme">
                            {this.themesrow()}
                        </select>

                    </div>
                    <FormGroup>
                        <Label for="description">{t("Information_about_collection")}</Label>
                        <Input onChange={this.handleChange} value={this.state.description}
                               type="textarea" name="description" id="description" />
                    </FormGroup>
                    <Button color="primary" >{t("Save")}</Button>
                </Form>
                        </div>
                        <div className="col-sm">
                            <Label for="image">{t("Image")}</Label>
                            <UploadImages/>
                            <img style={{maxWidth: "50%" , maxHeight: "50%" }} id="previu" src={this.state.image}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default withTranslation() (EditCollectionn)