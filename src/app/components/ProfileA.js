import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Alert } from "react-bootstrap"

import AuthenticationService from '../services/AuthenticationService';
import BackendService from "../services/BackendService";
import CollectionCard from "../collection elements/card";


class ProfileAd extends Component {

    constructor(props) {
        super(props);

        this.state = {user: undefined,
            userIn: '',
            collectionsList: []
        };
        var removeCollectionById =this.removeCollectionById.bind(this);
    }

    componentDidMount() {


        BackendService.getUserInById(this.props.match.params.idUser).then( response => {
            console.log(response.data);
            this.setState({userIn: response.data});
        });



        BackendService.getUserCollections(this.props.match.params.idUser).then( response => {
            //console.log(response.data);
            this.setState({collectionsList: response.data});
            console.log(response.data);
        });
    }

    collectionElement () {
        var removeCollectionById = this.removeCollectionById;

        return this.state.collectionsList.map((collection) =>
            <CollectionCard removeCollectionById={removeCollectionById.bind(this)} key={collection.id} collection={collection} />
        );
    }



    removeCollectionById(id) {
        BackendService.removeCollectionById(id)
            .then( response => {
                const isNotId = collection => collection.id !== id;
                const updatedCollectionsList = this.state.collectionsList.filter(isNotId);
                this.setState({ collectionsList: updatedCollectionsList });
            });
    }

    render() {



        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div style={{marginTop:"20px"}}>
                        <Alert variant="info">
                            <h2>User Info</h2>
                            <ul>
                                <li>Username: {this.state.userIn.username}</li>

                            </ul>
                        </Alert>
                        <Link to={`/createcollection/${this.props.match.params.idUser}`} ><Button type="submit" color="primary">Create new collection</Button></Link>
                    </div>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="row">
                                {this.collectionElement()}

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ProfileAd;