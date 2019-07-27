import React, {Component} from 'react'
import {connect} from 'react-redux'


class UserInfo extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <hr/>
        <img class="img-fluid mx-auto d-block" src={this.props.user.image} />
        <hr/>
      </div>
    );
  }
}


const mapsToProps = (state) => {
  return({
    user: state.user.profile,
  });
}

export default connect(mapsToProps)(UserInfo)
