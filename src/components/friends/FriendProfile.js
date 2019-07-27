import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card, CardBody, Col, Label, Row } from 'reactstrap';
import ReactLoading from 'react-loading';

import {ShowPost, CreatePost} from '../packages/post'
import UserInfo from '../users/UserInfo'

import {getUserTimeline} from '../../store/actions/timelineActions'
import {getFriendInfo} from '../../store/actions/friendActions'


class FriendProfile extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.getFriendInfo(id);
    this.props.updateTimeline(id);
  }

  displayPosts() {
    var items = []
    
    if(this.props.posts === undefined || this.props.posts.length == 0 )
      items.push(<ReactLoading type="bubbles" height="10%" width={'20%'}/>);
    
    else
      for( const post of this.props.posts){
        items.push( <ShowPost key={post.id} post={post} /> )
      }   
      return items;
    
  }

  render(){
    return(
      <div>
        <Row>
          <Col sm="3" style={{position:"fixed"}}>
            <UserInfo />
          </Col>
          
          <Col sm={{size: 6, offset: 3}} >
            {this.displayPosts()}
          </Col>
        </Row>
      </div>
      );
  }
}


const mapsToProps = (state) => {
  return {
    user: state.firebase.profile,
    posts: state.poststore.posts
  };
}

const mapsDispatchToProps = (dispatch) => {
  return {
    updateTimeline: (user_id) => dispatch( getUserTimeline(user_id) ),
    getFriendInfo: (friend_id) => dispatch( getFriendInfo(friend_id) )
  };
}

export default connect(mapsToProps, mapsDispatchToProps)(FriendProfile)
