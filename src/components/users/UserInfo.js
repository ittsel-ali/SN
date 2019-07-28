import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'reactstrap' 


class UserInfo extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <hr/>
        <Card className="card-color-blue">
          <img class="img-fluid mx-auto d-block" src={this.props.user.image} />
          <Button color="primary" >
            <b>{this.props.user.name}</b>
          </Button>

        </Card>
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
