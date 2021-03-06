import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './app/components/Home';
import Profile from './app/components/Profile';
import ProfileAd from './app/components/ProfileA';
import SignUp from './app/components/SignUp';
import AdminPage from './app/components/AdminPage';
import Login from './app/components/Login';
import CreateCollection from "./app/collection/CreateCollection";
import EditCollectionn from './app/collection/EditCollectionn';
import AddItem from "./app/item/AddItem";
import TableItem from "./app/item/TableItem";
import EditItems from "./app/item/EditItems";
import ItemPage from "./app/item/ItemPage";
import ViewTableItem from "./app/item/ViewTableItem";




class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/home' exact={true} component={Home}/>
          <Route path='/profiles' exact={true} component={Profile}/>
          <Route path='/profile/:idUser' exact={true} component={ProfileAd}/>
          <Route path='/createcollection' exact={true} component={CreateCollection}/>
          <Route path='/createcollection/:idUser' exact={true} component={CreateCollection}/>
          <Route path='/admin' exact={true} component={AdminPage}/>
          <Route path='/signin' exact={true} component={Login}/>
          <Route path='/signup' exact={true} component={SignUp}/>
          <Route path='/editCollection/:id' exact={true} component={EditCollectionn}/>
          <Route path='/editCollection/:id/addItem' exact={true} component={AddItem}/>
          <Route path='/editCollection/:id/tableItem' exact={true} component={TableItem}/>
          <Route path='/editCollection/:id/viewTableItem' exact={true} component={ViewTableItem}/>
          <Route path='/editCollection/:id/editItems/:idItem' exact={true} component={EditItems}/>
          <Route path='/viewItem/:idItem' exact={true} component={ItemPage}/>

        </Switch>
      </Router>
    )
  }
}

export default App;