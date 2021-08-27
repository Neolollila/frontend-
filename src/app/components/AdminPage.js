import AppNavbar from './AppNavbar';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Alert } from "reactstrap";
import BackendService from '../services/BackendService';
import axios from "axios";
import {Link} from "react-router-dom";



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
          console.log(response.data);
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
      axios.delete(`/user/${id}`)
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
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <table className="table">
            <thead color="primary-color" textWhite>
              <tr>
                <th>id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                  <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {this.tablerow()}
            </tbody>
          </table>
          {
            this.state.content ? (
              <div style={{marginTop: "20px"}}>
                <Alert variant="info">
                  <h2>{this.state.content}</h2>
                </Alert>
              </div>
            ) : (
              <div style={{marginTop: "20px"}}>
                <Alert variant="danger">
                  {this.state.error}
                </Alert>
              </div>
            )
          }
        </Container>
      </div>
    );
  }
}



export default AdminPage;