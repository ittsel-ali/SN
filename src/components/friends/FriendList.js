import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import {getFriendList, updateFriendList} from '../../store/actions/friendActions'
import Notifier from '../../services/Notifier';

class FriendList extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      userID: window.localStorage.getItem("user.token") 
    };
  }

  componentDidMount(){
    this.props.updateFreinds();

    const notifier = new Notifier();
    notifier.subscribeToFCNotifier(this.state.userID, this.props.addNewFriend);
  }

  displayFriends(){
    const list = [];

    if( this.props.friends == undefined || this.props.friends.length == 0)
      list.push(
        <p class="text-center">
          <Typography variant="body2" color="textSecondary" component="p">
            No Friends Available
          </Typography>
        </p>);
    else
      for( const friend of this.props.friends){
        list.push(
          <ListItem id={friend.id}>
            <ListItemAvatar>
              <Avatar src={friend.image}>
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText id={friend.id} primary={
              <Typography variant="body2" color="textSecondary" component="p">
                <a href={`/friend/${friend.id}`} class="active">{friend.name}</a>
              </Typography>
            } />
              
          </ListItem>
          );
        
      };

    return list;
  }
  render(){
    return(
      <List subheader={<ListSubheader>Friends</ListSubheader>}>
      {this.displayFriends()}  
      </List>
      );
  }
}


const mapsToProps = (state) => {
  return({
    friends: state.friendstore.friends
  });
}

const mapsDispatchToProps = (dispatch) => {
  return {
    updateFreinds: () => dispatch(getFriendList()),
    addNewFriend: (user) => dispatch(updateFriendList(user))
  }
}

export default connect(mapsToProps, mapsDispatchToProps)(FriendList)
