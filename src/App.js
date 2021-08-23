import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './app/components/Home';
import Profile from './app/components/Profile';
import SignUp from './app/components/SignUp';
import AdminPage from './app/components/AdminPage';
import Login from './app/components/Login';
import CreateCollection from "./app/components/CreateCollection";
import EditCollectionn from './app/components/EditCollectionn';
import AddItem from "./app/components/AddItem";
import TableItem from "./app/components/TableItem";




class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/home' exact={true} component={Home}/>
          <Route path='/profiles/:id' exact={true} component={Profile}/>
          <Route path='/createcollection' exact={true} component={CreateCollection}/>
          <Route path='/admin' exact={true} component={AdminPage}/>
          <Route path='/signin' exact={true} component={Login}/>
          <Route path='/signup' exact={true} component={SignUp}/>
          <Route path='/editCollection/:id' exact={true} component={EditCollectionn}/>
          <Route path='/editCollection/:id/addItem' exact={true} component={AddItem}/>
          <Route path='/editCollection/:id/tableItem' exact={true} component={TableItem}/>
        </Switch>
      </Router>
    )
  }
}

export default App;