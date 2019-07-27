import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Button, Card, CardBody, CardTitle, CardText} from 'reactstrap'
import {getFriendRequests, confirmFriendship, updateFriendRequests} from '../../store/actions/friendActions'
import Notifier from '../../services/Notifier';

class FriendRequestList extends Component{
  constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            userID: window.localStorage.getItem("user.token") 
        };
    }

  toggle() {
      this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
      }));
  }

  componentDidMount() {
    this.props.updateRequests();

    const notifier = new Notifier();
    notifier.subscribeToFRNotifier(this.state.userID, this.props.addNewRequest);
  }

  confirm = (e) => this.props.confirmFriendship(e.target.value)


  displayRequests(){
    const list = [];

    if( this.props.friendrequests == undefined || this.props.friendrequests.length == 0)
      list.push(<p>No Request Available</p>);
    else
      for( const friendrequest of this.props.friendrequests){
        list.push(<DropdownItem>
        <p>{friendrequest.name}</p>
        <Button onClick={this.confirm} value={friendrequest.id}>Confirm</Button>
        </DropdownItem>)
      };

    return list;
  }

  render(){
    console.log(this.props);
    return(
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="mr-4">
        <DropdownToggle nav>
        <Badge badgeContent={this.props.friendrequests.length} color="secondary">
          <Avatar src={this.props.friendrequests.length == 0 ? "https://i1.wp.com/www.molddrsusa.com/wp-content/uploads/2015/11/profile-empty.png.250x250_q85_crop.jpg?ssl=1" : this.props.friendrequests[0].image}>
            R
          </Avatar>
        </Badge>    
        </DropdownToggle>
        <DropdownMenu>
          {this.displayRequests()}
        </DropdownMenu>
      </Dropdown>
      );
  }
}


const mapsToProps = (state) => {
  return({
    user: state.firebase.profile,
    friendrequests: state.friendrequeststore.friend_requests,
  });
}

const mapsDispatchToProps = (dispatch) => {
  return {
    updateRequests: () => dispatch(getFriendRequests()),
    confirmFriendship: (friend_id) => dispatch(confirmFriendship(friend_id)),
    addNewRequest: (user) => dispatch(updateFriendRequests(user))
  }
}

export default connect(mapsToProps, mapsDispatchToProps)(FriendRequestList)
