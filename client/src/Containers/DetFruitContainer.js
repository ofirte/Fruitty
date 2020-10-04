import { connect } from 'react-redux'
import DetailedFruit from '../Views/DetailedFruit'
import {toggleFavourite,deleteNutrition} from '../Actions'
import {saveNutritionWithSideEffect} from '../middleware/Middleware'
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state, ownProps) => {
  var index = state.fruits.findIndex((element)=>{
    return element.name === ownProps.match.params.name
  })
  if (index === -1) {
    return {
      overView: [],
      nutrition: [],
      name: "",
      favFruits:[]
    }
  }
  return {
    overView: state.fruits[index].overview,
    nutrition: state.fruits[index].nutrition,
    name:state.fruits[index].name,
    fruitIndex:index,
    image:state.fruits[index].image,
    wiki:state.fruits[index].wiki_link,
    favFruits:state.favFruits,
    token:state.login_token
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPlusClick: (fruitName,newNutritions) => {
      newNutritions.push({title:"Lorem Ipsum",value:"Lorem Ipsum"})
      dispatch(saveNutritionWithSideEffect(fruitName,newNutritions, ownProps.match.params.token))
    },
    onAddToFavClick:(fruitName)=>{
      dispatch(toggleFavourite(fruitName))
    },
    onDelClick:(index)=>{
      dispatch(deleteNutrition(index,ownProps.match.params.name))
    },
    onEditEndClick:(fruitName,newNutritions)=>{
      dispatch(saveNutritionWithSideEffect(fruitName,newNutritions, ownProps.match.params.token))
    }
  }
}

const DetFruitContainer = connect(mapStateToProps, mapDispatchToProps)(DetailedFruit)

export default withRouter(DetFruitContainer)