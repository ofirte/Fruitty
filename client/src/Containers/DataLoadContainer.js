import React from "react"
import { withRouter } from 'react-router-dom';
import { updateFruits, updateToken } from '../Actions'
class DataLoadContainer extends React.Component {
  componentDidMount() {
    console.log("mounting")
    console.log(this.props.match.params.token)
    const requestOptions = {
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'login_token': this.props.match.params.token
      }
    };
    fetch("http://localhost:5000/api/getFruits", requestOptions)
    .then(res => res.json())
    .then((result) => {
        console.log("got my fruits")
        console.log(result)
        this.props.store.dispatch(updateFruits(result.fruits))
        this.props.store.dispatch(updateToken(this.props.match.params.token))
      },
      (error) => {
        console.log("i'm error")
      })
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default withRouter(DataLoadContainer)