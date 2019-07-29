import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
// import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';

import {Button, Card, CardBody, CardTitle, CardText, Input} from 'reactstrap'
import {searchUser, inviteFriend} from '../../store/actions/friendActions'

class FriendList extends Component{
  constructor(props){
    super(props);
    this.state = {
      disable: false
    };
  }

  componentDidMount(){
    this.props.searchUser("");
  }

  invite = (e) => {
    this.props.inviteFriend(e.target.value);
    e.target.innerHTML =  "Sent";
    e.target.className = "btn btn-success";
    e.target.disabled = true;
  }

  search = (e) => {
    if( e.key == 'Enter')
      this.props.searchUser(e.target.value);
  } 

  displayFriends(){
    const list = [];

    if( this.props.searchUsers == undefined || this.props.searchUsers.length == 0)
      list.push(
        <p class="text-center">
          <Typography variant="body2" color="textSecondary" component="p">
            No Search Result
          </Typography>
        </p>);
    else
      for( const user of this.props.searchUsers){
        list.push(
          <ListItem key={user.user.id} button>
            <ListItemAvatar>
              <Avatar
                alt={user.user.name}
                src={user.user.image}
              />
            </ListItemAvatar>
            <ListItemText id={user.user.id} primary={
              <Typography variant="body2" color="textSecondary" component="p">
                {user.user.name}
              </Typography>
              } />
            <ListItemSecondaryAction>
              <Button color="primary" onClick={this.invite} value={user.user.id}>
              {this.state.disable ? "Sent" : "Invite"}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      };

    return list;
  }
  render(){
    return(
      <List dense subheader={<ListSubheader><Input onKeyPress={this.search} /></ListSubheader>}>
        {this.displayFriends()}
      </List>
      );
  }
}


const mapsToProps = (state) => {
  return({
    user: state.firebase.profile,
    searchUsers: state.searchedUserstore.users
  });
}

const mapsDispatchToProps = (dispatch) => {
  return {
    searchUser: (string) => dispatch(searchUser(string)),
    inviteFriend: (friend_id) => dispatch(inviteFriend(friend_id))
  }
}

export default connect(mapsToProps, mapsDispatchToProps)(FriendList)
