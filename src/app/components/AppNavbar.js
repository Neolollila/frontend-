import React, { Component,  } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavbarText, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService';

import ThemeSwitch from '../style/ThemeSwitch';
import LanguageSelect from "../multilanguage/languageSelect";
import {withTranslation} from "react-i18next";



class AppNavbar extends Component {



  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);

    this.state = {
      showUser: false,
      showPM: false,
      showAdmin: false,
      username: undefined,
      login: false,
      userid: 0
    };


  }




  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();



    if (user) {
      const roles = [];

      user.authorities.forEach(authority => {
        roles.push(authority.authority)
      });

      this.setState({
        showUser: true,
        showPM: roles.includes("ROLE_PM") || roles.includes("ROLE_ADMIN"),
        showAdmin: roles.includes("ROLE_ADMIN"),
        login: true,
        username: user.username,
        userid: "/profiles/"+user.id
      });
    }
  }




  signOut = () => {
    AuthenticationService.signOut();
    window.location.reload();
  }



  toggle() {

    this.setState({
      isOpen: !this.state.isOpen,

    });
  }


  render() {
    const { t } = this.props;
    return (<Navbar color="dark" dark expand="md" >

          <NavbarBrand tag={Link} to="/home">Mandrik.phys</NavbarBrand>
      <Nav className="mr-auto">
        <NavLink href="/home">{t("home")}</NavLink>
        {/*{this.state.showUser && <NavLink href="/createcollection">Create Collection</NavLink>}*/}
        {this.state.showAdmin && <NavLink href="/admin">{t("admin")}</NavLink>}

      </Nav>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        {
          this.state.login ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavbarText>
                    {t("Signed_in_as")} <a href="/profiles/0">{this.state.username}</a>
                  </NavbarText>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.signOut}>{t("SignOut")}</NavLink>
              </NavItem>
            </Nav>                 
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/signin" className="float-right">{t("Login")}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup" className="float-right">{t("SignUp")}</NavLink>
              </NavItem>
            </Nav>
          )
        }
        <ThemeSwitch/>
        <LanguageSelect />
      </Collapse>

    </Navbar>
    );
  }
}

export default withTranslation()(AppNavbar)