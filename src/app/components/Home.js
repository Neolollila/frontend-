import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Button, CardBody, CardSubtitle, CardText, CardTitle, Container} from 'reactstrap';
import { Alert } from 'reactstrap';

import {CardGroup} from "react-bootstrap";
import {Card} from "@material-ui/core";
import {Link} from "react-router-dom";
import BackendService from "../services/BackendService";

import { withTranslation } from "react-i18next";
import LanguageSelect from "../multilanguage/languageSelect";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
        lastitems:[],
        largestcollections: []
    }

  }

  componentDidMount() {
    BackendService.getLastAddedItems()
        .then( response => {
          this.setState({
            lastitems: response.data
          })
        } , error => {
          this.setState({
            error: error.toString()
          });
        });

      BackendService.getLargestCollections()
          .then( response => {
              console.log(response)
              this.setState({
                  largestcollections: response.data
              })
          } , error => {
              this.setState({
                  error: error.toString()
              });
          });
  }

  itemList () {
      return this.state.lastitems.map((item) =>
          <Card>
              <CardBody>
                  <CardTitle tag="h5"><Link to={`/viewItem/${item.id}`}>{item.name}</Link></CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">Info about Item</CardSubtitle>
                  <CardText>Perfect paradise</CardText>
              </CardBody>
          </Card>
      );
  }

  collectionList () {
      return this.state.largestcollections.map((collection) =>
          <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                  <img className="card-img-top"
                       data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                       alt="Thumbnail [100%x225]"
                       src={collection.image !=null ? collection.image : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17b64a79264%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17b64a79264%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.71875%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"}
                       data-holder-rendered="true"/>
                  <div className="card-body">
                      <p className="card-text">Theme:{collection.theme.name}</p>
                      <p className="card-text">Collection name:{collection.name}</p>
                      <p className="card-text">Description:{collection.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                              <Link to={`/editCollection/${collection.id}/viewTableItem`}>
                                  <button type="button" className="btn btn-sm btn-outline-secondary">Table item</button>
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  render() {
      const { t } = this.props;
    return (


      <div>
        <AppNavbar/>
        <Container fluid>
          <div style={{marginTop:"20px"}}>
            <Alert color="primary">
                {t("Last_added_items")}
            </Alert>
            <CardGroup>
              {this.itemList()}
            </CardGroup>

              <div className="album py-5 bg-light">
                  <Alert color="info">
                      {t("Collections_with_the_largest")}
                  </Alert>
                  <div className="container">
                      <div className="row">

                              {this.collectionList()}
                      </div>
                  </div>
              </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withTranslation() (Home)