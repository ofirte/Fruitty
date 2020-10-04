import React from "react"
import DetailedFruitEntry from "../Components/DetailedFruitEntry"
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"
import { useHistory } from "react-router-dom"
import {
  Link
} from "react-router-dom"
class DetailedFruit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {nutrition: props.nutrition,editable:false,isfav:this.isFav()
    }
  }
  
isFav(){
    if(localStorage.getItem("fav")===null){
       this.setState({isfav:true})
       return
  }
    var userInfo=JSON.parse(localStorage.getItem("fav")).find((obj)=>obj.token===this.props.token)
    if(typeof userInfo=== 'undefined')
      return false
    if(userInfo.fruits.includes(this.props.name))
      return true
    else
        return false
}

handleFavorite(){
    var storage;
    if(localStorage.getItem('fav')!=null){//If there are favourites
      storage = JSON.parse(localStorage.getItem('fav'));
      var userIndex=storage.findIndex((user)=>user.token===this.props.token)
      if(userIndex===-1)
        storage.push({token:this.props.token,fruits:[this.props.name]})
      else{
        var fruitIndex=storage[userIndex].fruits.findIndex((fruitName)=>fruitName===this.props.name)
        if(fruitIndex===-1)
          storage[userIndex].fruits.push(this.props.name)
        else
          storage[userIndex].fruits.splice(fruitIndex,1)
      }
    }
    else
        storage=[{token:this.props.token,fruits:[this.props.name]}]
    localStorage.setItem("fav",JSON.stringify(storage))
    this.setState({isfav:!this.state.isfav})
  }
  
  onEditorClick=()=>{
    if (this.state.editable) 
        this.props.onEditEndClick(this.props.name, this.state.nutrition)
    this.setState({nutrition: this.state.nutrition, editable: !this.state.editable})
  }

  static getDerivedStateFromProps(nextProps, prevState) { 
    if (nextProps.nutrition.length !== prevState.nutrition.length) {
      var newArray = nextProps.nutrition.map((nutrition)=> {
        return Object.assign({}, nutrition, [])
      }) 
      return ({nutrition: newArray, editable: prevState.editable})
    }
    return prevState
  }

  nutritionTitleChanged(nutritionIndex, newTitle) {
    var newNutritions = Object.assign([], this.state.nutrition, {})
    newNutritions[nutritionIndex].title = newTitle
    this.setState({nutrition: newNutritions, editable: this.state.editable})
  }

  nutritionValueChanged(nutritionIndex, newValue) {
    var newNutritions = Object.assign([], this.state.nutrition, {})
    newNutritions[nutritionIndex].value = newValue
    this.setState({nutrition: newNutritions, editable: this.state.editable})
  }
  
  render() {
    return (
      <div style={{paddingBottom:"60px"}}>
        <NavBar token={this.props.token}></NavBar>
        <div className="det_tables">
          <Link to={"/"+this.props.token+"/Fruits"}> <button className="BtnBack">back</button></Link>
          <h3 style={{lineHeight:"0"}}>Fruit info</h3>
          <img alt="my" className="fruitImage" src={this.props.image}></img> 
            <span className="infoImageName" style={{display:"inline-block"}}>
              <h5 >Fruit name:</h5>
              <h3 className="fruitHeadLine" style={{lineBreak:"0"}}>{this.props.name}
                <span  style={{display:"inline"}}>
                  <FontAwesomeIcon id="star" color={this.state.isfav?"orange":"black"} icon={faStar} onClick={()=>this.handleFavorite()} ></FontAwesomeIcon>
                </span>
              </h3>
              <a href={this.props.wiki} target="_blank" rel="noopener noreferrer"><button className="wikiBtn">Show in wiki</button></a>
            </span> 
          <div>
            <span>
              <p head_lines_det>Overview</p>
            </span>
            <table >
                {this.props.overView.map((value,index) => {
                  return <tr className="border_bottom"><DetailedFruitEntry  from="overview" 
                                        index={index} title={value.title}
                                         value={value.value}></DetailedFruitEntry></tr> })} 
            </table>
            <span>
              <p className="head_lines_det">Nutrition</p>
              <FontAwesomeIcon onClick={this.onEditorClick} className="pen_icon" icon={faPencilAlt}></FontAwesomeIcon>
              <FontAwesomeIcon className="icons" icon={faPlusCircle} onClick={()=>this.props.onPlusClick(this.props.name,this.state.nutrition)}></FontAwesomeIcon>
            </span>
            <div >
            <table  id="nutritionTable" >
              {this.state.nutrition.map((value,index) => {  
              return <tr className="border_bottom"><DetailedFruitEntry editable={this.state.editable} Entryindex={index} onDelClick={()=>this.props.onDelClick(index)} 
              nutritionValueChanged={(newValue)=> {this.nutritionValueChanged(index, newValue)}}
              nutritionTitleChanged={(newTitle)=> {this.nutritionTitleChanged(index, newTitle)}}
              from="nutrition" index={value.index} title={value.title} value={value.value}> </DetailedFruitEntry></tr>})}          
            </table>
            </div>
       </div>
       <Footer></Footer>
     </div>
     </div>
    );
  }
}

export default DetailedFruit
