import { connect } from 'react-redux'
import Fruit from '../Views/Fruit'
import React from "react"
import { withRouter } from 'react-router-dom';
import { updateFruits } from '../Actions'
class FruitsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getStateFromStore()
    this.bindFruits()
  }
  getStateFromStore(){
    var data=this.props.store.getState()
    if(!this.props.favoriets)
        var fruitNames = data.fruits.map((fruit)=> { return fruit.name })
    else {
        var fav = localStorage.getItem("fav")!=null?
                          JSON.parse(localStorage.getItem("fav")):[]
        console.log(fav)
        var fruitNames=fav.find((obj)=>obj.token===this.props.match.params.token)
        fruitNames=fruitNames===null?[]:fruitNames.fruits
        console.log(fruitNames)
    }
     return {fruitNames:fruitNames}
  }

  bindFruits() {
    this.subscription = this.props.store.subscribe(()=> {
        this.setState(this.getStateFromStore())  
    })
  }
 
  render() {
    return (
      <Fruit url= {this.props.location.pathname} fruits={this.state.fruitNames} user_token={this.props.match.params.token}></Fruit>
    )
  }
}

export default withRouter(FruitsContainer)