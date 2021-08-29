import AppNavbar from '../collection elements/AppNavbar';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Alert } from "reactstrap";
import BackendService from '../services/BackendService';
import axios from "axios";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";



class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state= {
      content: "",
      error: "",
      users: []
    };
      this.removeUserById = this.removeUserById.bind(this);
  }

  componentDidMount() {
    BackendService.getAdminBoard()
      .then( response => {
        this.setState({
          users: response.data
        })
      } , error => {
        console.log(error);
        this.setState({
          error: error.toString()
        }); 
      });


  }

    setActive(id) {
        BackendService.setActive(id)
            .then( response => {
                this.setState({
                    users: response.data
                })
            });
    }

  setAdmin(id) {
      BackendService.addAdmin(id)
          .then( response => {
              this.setState({
                  users: response.data
              })
          });
  }

  removeUserById(id) {
      BackendService.removeUserById(id)
          .then( response => {
              const isNotId = user => user.id !== id;
              const updatedUsers = this.state.users.filter(isNotId);
              this.setState({ users: updatedUsers });
          });
  }

    tablerow(){

        return this.state.users.map((user) =>
            <tr>
                <th scope="row">{user.id}</th>
                <td><Link to={`/profile/${user.id}`}>{user.username}</Link></td>
                <td>{user.email}</td>
                <td>{user.roles[0].name}</td>
                <td>{user.active ? 'true' : 'false'}</td>
                <td>
                    <div>
                        <button type="button" className="btn btn-info" onClick={() => this.setActive(user.id)}>Block</button>
                        <button type="button" className="btn btn-danger" onClick={() => this.removeUserById(user.id)}>Delete</button>
                        <button type="button" className="btn btn-success" onClick={() => this.setAdmin(user.id)}>Admin</button>
                    </div>
                </td>
            </tr>
        );
    }

  render() {
      const { t } = this.props;
      console.log(this.state.content);
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <table className="table">
            <thead color="primary-color" textWhite>
              <tr>
                <th>{t("id")}</th>
                <th>{t("Username")}</th>
                <th>{t("Email")}</th>
                <th>{t("Role")}</th>
                  <th>{t("Active")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
            {this.tablerow()}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}



export default withTranslation() (AdminPage)