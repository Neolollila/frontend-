import React, { Component } from 'react';
import AppNavbar from '../collection elements/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Alert } from "react-bootstrap"

import AuthenticationService from '../services/AuthenticationService';
import axios from "axios";
import BackendService from "../services/BackendService";
import CollectionCard from "../collection elements/card";
import {withTranslation} from "react-i18next";


class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {user: undefined,
                  userIn: null,
                  collectionsList: []
    };
    var removeCollectionById =this.removeCollectionById.bind(this);
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    BackendService.getUserInById(this.props.match.params.id).then( response => {
          this.setState({userIn: response.data});
      });

    this.setState({user: user});

    BackendService.getCurrentUserCollections().then( response => {
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
    let userInfo = "";
    const user = this.state.user;
    const { t } = this.props;

    // login
    if (user && user.accessToken) {

      let roles = "";

      user.authorities.forEach(authority => {
        roles = roles + " " + authority.authority
      });

      userInfo = (
                <div style={{marginTop:"20px"}}>
                  <Alert variant="info">
                    <h2>{t("User_Info")}</h2>
                    <ul>
                      <li>{t("Username")}: { this.state.userIn==null ? user.username : this.state.userIn.username}</li>
                      <li>{t("Authorities")}: { this.state.userIn==null ? roles : this.state.userIn.role}</li>
                    </ul>
                  </Alert>
                    <Link to="/createcollection"><Button type="submit" color="primary">{t("Create_new_collection")}</Button></Link>
                </div>
              );
    } else { // not login
      userInfo = <div style={{marginTop:"20px"}}>
                    <Alert variant="primary">
                      <h2>{t("Profile_Component")}</h2>
                      <Button color="success"><Link to="/signin"><span style={{color:"white"}}>{t("Login")}</span></Link></Button>
                    </Alert>
                  </div>
    }

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
        {userInfo}
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

export default withTranslation() (Profile)