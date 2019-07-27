import React, {Component} from 'react'
import {connect} from 'react-redux'
import { CardBody, Button, Row } from 'reactstrap';

import {registerCallback} from '../../store/actions/callbackActions'
import {ShowComment, CreateComment} from '../packages/comment'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



class ShowPost extends Component{
  constructor(props){
    super(props);
    this.state = this.getState(props);
    this.updateState = this.updateState.bind(this);
  }

  getState(props){
    return {
      post: {
        id: props.post.id,
        text: props.post.text,
        image: props.post.image,
        total_comments: props.post.total_comments,
        comments: props.post.comments,
        author: props.post.author,
        author_image: props.post.author_image,
      }
    };
  }

  updateState(state) {
    this.setState(state);
  }

  componentDidMount(){
    this.props.register(this.updateState, this.state.post.id, "ShowPost");
  }

  displayComments(){
    var items = []

    if (this.state.post.comments == undefined)
      items.push( <p>Comments not available </p>);
    else{
      for(const comment of this.state.post.comments){
        items.push( <ShowComment comment={comment} post={this.state.post} /> );
      }
    }

    return items;
  }

  render(){
    return(
      <div className="animated fadeIn mt-3">
        <Card raised className="card">
          <CardHeader
            avatar={
              <Avatar src={this.state.post.author_image} >
                LU
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={this.state.post.author}
            subheader="September 14, 2016"
          />
          
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.post.text}
            </Typography>
          </CardContent>
          
          <img class="img-fluid mx-auto d-block" src={this.state.post.image} />
          
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.post.total_comments} Comments
            </Typography>
            <IconButton aria-label="share">
              
            </IconButton>
          </CardActions>
          
          <Divider variant="middle" component="hr" />
          
          <List>
            {this.displayComments()}
            <ListItem alignItems="flex-start">
            <ListItemText>  
              <CreateComment post={this.state.post} />
            </ListItemText>
            </ListItem>
          </List> 
        </Card>
      </div>
      );
  }
}


const mapsToProps = (state) => {
  return({
    user: state.firebase.profile,
  });
}

const mapsDispatchToProps = (dispatch) => {
  return{
    register: (event, id, name) => dispatch(registerCallback(event, id, name)),
  };
}

export default connect(mapsToProps, mapsDispatchToProps)(ShowPost)
