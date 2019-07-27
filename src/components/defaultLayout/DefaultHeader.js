import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Button} from 'reactstrap';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import { Avatar } from '@material-ui/core';
import Accessibility from '@material-ui/icons/Accessibility';
import Menu from '@material-ui/icons/Menu';

import FriendRequestList from '../friends/FriendRequestList'

import logo from '../../assets/img/footprint.png'
import miniLogo from '../../assets/img/footprint_mini.png'

import { signOut } from '../../store/actions/authActions'



class DefaultHeader extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            notifDropDown: false,
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    NoteToggle() {
        this.setState(prevState => ({
            notifDropDown: !prevState.dropdownOpen
        }));
    }

  render() {
    const { profile } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile >
          <Button color="primary" >
            <Accessibility/>
            <b>LinkUp</b>
          </Button>
        </AppSidebarToggler>
        
        <AppSidebarToggler className="d-md-down-none" display="lg" >
          <Button color="primary" >
            <Accessibility/>
            <b>LinkUp</b>
          </Button>
        </AppSidebarToggler>

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <FriendRequestList />
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="mr-4">
            <DropdownToggle nav>
              <Button className="btn btn-sm btn-squeze" color="primary">
                <Menu/>
              </Button>
            </DropdownToggle>
            <DropdownMenu>
                {/*<DropdownItem header tag="div" className="text-center"><strong>Profile</strong></DropdownItem>*/}
                <DropdownItem><NavLink href="/profile"><i className="fa fa-bell-o"/> Edit Profile</NavLink></DropdownItem>
                {/*<DropdownItem><i className="fa fa-envelope-o"/> Change Password</DropdownItem>*/}
                {/*<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>*/}
                <DropdownItem onClick={this.props.logout}><i className="fa fa-lock"/> Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
        </Nav>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
