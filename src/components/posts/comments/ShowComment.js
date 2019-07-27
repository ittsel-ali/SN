import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Row } from 'reactstrap'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

class ShowComment extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <ListItem alignItems="flex-start">
       
        <Chip
          avatar = {
            <Avatar size="small" alt="Remy Sharp" src={this.props.comment.author_image} >R</Avatar>
            }
        
          label = {
            <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                  >
                
                {this.props.comment.author}
                
                </Typography>
                {' - '+this.props.comment.text}
              </React.Fragment>
              }/>
            }
          variant="outlined"
        />
      </ListItem>
      );
  }
}


const mapsToProps = (state) => {
  return({
    user: state.firebase.profile,
  });
}

export default connect(mapsToProps)(ShowComment)
