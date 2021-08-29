import React, { Component } from 'react';

import AppNavbar from "../collection elements/AppNavbar";


import BackendService from "../services/BackendService";
import FormCollection from "../collection elements/Form";
import FormEditCollection from "../collection elements/FormEdit";
import {withTranslation} from "react-i18next";

class CreateCollectionPage extends Component {

    constructor(props) {
        super(props);

        this.state={
            themes: []
        };
    }

    componentDidMount() {
        BackendService.getThemeList()
            .then( response => {
                console.log(response.data);
                this.setState({
                    themes: response.data
                })
            } , error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }



    render() {
        const { t } = this.props;
        return(
            <div>
                <AppNavbar/>
                <FormCollection idUser={this.props.match.params.idUser} themes={this.state.themes}/>
            </div>
        )
    }
}

export default withTranslation() (CreateCollectionPage)

