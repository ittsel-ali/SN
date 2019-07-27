import React, {Component} from 'react'
import {connect} from 'react-redux'

import { Input, Form, FormGroup, Button } from 'reactstrap';
import { createComment } from '../../../store/actions/commentActions'
import { executeCallback } from '../../../store/actions/callbackActions'

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';


class CreateComment extends Component{
  constructor(props){
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const props = this.props; 
    props.updateComment(e.target, props.post.id)
    .then(data => {
      this.updateDynamically(data);
    });
  }

  updateDynamically = (data) => {
    const props = this.props; 
    var state = {
      ...props.post,
      total_comments: props.post.total_comments+1,
      comments: [ ...props.post.comments, data]
      };
    
    state = {post: {...state}};

    this.props.updateParentComponent(props.post.id, "ShowPost", state);
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <TextField
          id="filled-full-width"
          label="comment..."
          placeholder="comment.."
          autoComplete="off"
          fullWidth
          margin="normal"
          variant="outlined"
          name="comment[text]"
          />
          <hr/>
        </FormGroup>
      </Form>
      );
  }
}


const mapsToProps = (state) => {
  return({
    user: state.user.profile,
  });
}

const mapsDispatchToProps = (dispatch) => {
  return {
    updateComment: (newComment, postID) => dispatch(createComment(newComment, postID)),
    updateParentComponent: (id, name, nextState) => dispatch(executeCallback(id, name, nextState))
  }
}

export default connect(mapsToProps, mapsDispatchToProps)(CreateComment)
