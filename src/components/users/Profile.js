import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form
} from 'reactstrap';

import MyAvatarEditor from './MyAvatarEditor';
import { updateProfile } from '../../store/actions/authActions'


class Profile extends Component {
  constructor(props) {
    super(props);

    const profile = this.props.profile;
    const auth = this.props.auth;

    this.state = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      region: profile.region,
      avatar: profile.avatar,
      uid: auth.uid,
      email: auth.email,
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  transmitAvatar = (dataURL) => {
      this.setState({
          avatar: dataURL,
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateProfile(e.target);
  }


  render() {
      return (
          <div className="animated fadeIn mt-3">
            <Row>
              <Col xs="12" md="12">
                <Card>
                  <Form onSubmit={this.handleSubmit}>
                  <CardHeader>
                    <strong>Edit your profile</strong>
                  </CardHeader>
                  <CardBody>
                    <FormGroup row className="my-0">
                      <Col xs="2">
                        <MyAvatarEditor transmitAvatar={this.transmitAvatar}/>
                      </Col>
                      <Col xs="10">
                        <FormGroup row className="my-0">
                          <Col xs="12">
                            <FormGroup>
                              <Label htmlFor="email">Email</Label>
                              <Input type="text" id="email" name="user[email]"value={this.state.email} disabled/>
                            </FormGroup>
                          </Col>
                        </FormGroup>

                        <FormGroup row className="my-0">
                          <Col xs="6">
                            <FormGroup>
                              <Label htmlFor="firstName">First name</Label>
                              <Input type="text" id="firstName" name="user[first_name]"placeholder="Enter your first name"
                                     value={this.state.firstName} onChange={this.updateInput}/>
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup>
                              <Label htmlFor="lastName">Last name</Label>
                              <Input type="text" id="lastName" name="user[last_name]" placeholder="Enter your last name"
                                     value={this.state.lastName} onChange={this.updateInput}/>
                            </FormGroup>
                          </Col>
                        </FormGroup>

                        <FormGroup row className="my-0">
                          <Col xs="6">
                            <FormGroup>
                              <Label htmlFor="gender">Gender</Label>
                              <Input type="select" id="gender" name="user[gender]" value={this.state.gender} onChange={this.updateInput}>
                                <option>Please select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup>
                              <Label htmlFor="region">Current region</Label>
                              <Input type="select" id="region" value={this.state.region} onChange={this.updateInput}>
                                <option value=""></option>
                                <option value="Canada">Canada</option>
                                <option value="Asia">Asia</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" color="primary" className="mr-2" ><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
      );
  }
}



const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (newProfile) => dispatch(updateProfile(newProfile)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
