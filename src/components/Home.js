import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card, CardBody, Col, Label, Row } from 'reactstrap';
import ReactLoading from 'react-loading';

import {ShowPost, CreatePost} from './packages/post'
import UserInfo from './users/UserInfo'
import UserSearch from './users/UserSearch'
import FriendList from './friends/FriendList'

import {getPosts} from '../store/actions/postActions'
import {updateUserProfile} from '../store/actions/profileActions'
import {executeCallback} from '../store/actions/callbackActions'
import Notifier from '../services/Notifier'


class Home extends Component{

  constructor(props){
    super(props);
    this.executeCallback = this.props.updatePostWithNotifier.bind(this);
    this.state = {
      userID: localStorage.getItem("user.token")
    }
  }

  componentDidMount(){
    this.props.updateUserProfile();
    this.props.updatePosts();

    const notifier = new Notifier();
    notifier.subscribeToCommentNotifier(this.state.userID, this.executeCallback );
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
          <Col sm="2" className="d-none d-md-block d-xl-none" style={{position:"fixed"}}>
            <UserInfo />
          </Col>
          
          <Col sm={{size: 6, offset: 2}} >
            <CreatePost />
            {this.displayPosts()}
          </Col>

          <Col sm="4">
            <Card>
              <FriendList />
            </Card>
            <Card>
              <UserSearch />
            </Card>
          </Col>
        </Row>
      </div>
      );
  }
}


const mapsToProps = (state) => {
  return {
    posts: state.poststore.posts,
  };
}

const mapsDispatchToProps = (dispatch) => {
  return {
    updatePosts: () => dispatch( getPosts() ),
    updateUserProfile: () => dispatch( updateUserProfile() ),
    updatePostWithNotifier: (id, name, nextState) => dispatch( executeCallback(id, name, nextState) )
  };
}

export default connect(mapsToProps, mapsDispatchToProps)(Home)
