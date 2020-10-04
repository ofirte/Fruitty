const initial_state = {fruits:[],favFruits:[]};

const fruitReducer=(fruits,action)=> {
    var newFruits = []
    var fruitIndex = fruits.findIndex((fruit)=>{
        return fruit.name === action.fruitName})
    newFruits = Object.assign([], fruits, {})
    switch(action.type){
        case "ADD_NUTRITION":
            newFruits[fruitIndex].nutrition = [
                ...fruits[fruitIndex].nutrition,
                {title: "Lurom Ipsum", value: "LrumIpsum"}
            ]
            return newFruits
        case "DELETE_NUTRITION":
            var newNutrition= newFruits[fruitIndex].nutrition.map((value)=>{
                return value
            })
            newNutrition.splice(action.index,1)
            newFruits[fruitIndex].nutrition=newNutrition
            return newFruits
        case "EDIT_NUTRITION":
            newFruits[fruitIndex].nutrition=action.newNutritions
            return newFruits
        default:
                return fruits
    }
    
}
const reducer=(state=initial_state,action)=>{
    console.log(state)
    console.log(action)
    switch(action.type){
        case "SIGN_IN":
            return true;
        case "ADD_NUTRITION":
        case "DELETE_NUTRITION":
        case "EDIT_NUTRITION":
            return Object.assign({}, state, {
                    fruits: fruitReducer(state.fruits,action)
                })
        case "UPDATE_TOKEN":
            return Object.assign({}, state, {
                login_token: action.token
            })
        case "UPDATE_FRUITS":
            console.log("UPDATE FRUITS")
            console.log(action.fruits)
            return Object.assign({}, state, {
                fruits: action.fruits
            })
        default:
            return state
    }
}

export default reducer



