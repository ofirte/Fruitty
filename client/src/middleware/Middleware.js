import { editNutrition } from "../Actions";

export const saveNutritionWithSideEffect=(fruitName, newNutritions, login_token)=> {
    return function(dispatch) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'login_token': login_token,
            },
            body: JSON.stringify({ nutritions: newNutritions,fruitName:fruitName})
          };
          fetch("http://localhost:5000/api/fruit/" + fruitName + "/updateNutrition", requestOptions)
          .then(res => res.json())
          .then((result) => {
              console.log("got res")
              dispatch(editNutrition(fruitName, result.nutritions))
            },
            (error) => {
              console.log("i'm error")
              console.log(error)
            })
    }
}