import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Input, Card, CardBody, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import ReactLoading from 'react-loading';

import {createPost} from '../../store/actions/postActions'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';


class CreatePost extends Component{
  constructor(props){
    super(props);
    this.state = {
      disabled: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(() => {
      return {disabled: true};
    });

    this.props.createPost(e.target).then(() => this.setState(() => {
      return {disabled: false};
    }));
  }

  render(){
    return (
      <div>
        <Card>
          <CardBody>

            <Form onSubmit={this.handleSubmit}>
              <FormControl fullWidth>
              <TextField name="post[text]" autoComplete="off" placeholder="Write your mind..." />

              <br/>  
              
              <Row>
                <Col sm="6">
                  <Input type="file" multiple name="post[image_attributes][file]" />
                </Col>

                <Col sm="6">
                  <div class="float-right">
                    { this.state.disabled ? 
                      <ReactLoading type="bubbles" color="#426494" height={50} width={50}/> : 
                      <Button color="primary" > POST </Button>
                    }
                  </div>
                </Col>
              </Row>
              </FormControl>
            </Form>
          </CardBody>
        </Card>
      </div>
      );
  }
} 


const mapStateToProps = (state) => {
  return {
    user: state.firebase.profile,
  }
}

const funcToDispatch = (dispatch) => {
  return {
    createPost: (newPost) => dispatch(createPost(newPost))
  }
}

export default connect(mapStateToProps, funcToDispatch)(CreatePost);
