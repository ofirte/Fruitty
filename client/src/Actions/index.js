export const signIn=()=>{
    return{
        type:'SIGN_IN'
    };
}

export const toggleFavourite=(fruitName)=>{
    return {
        type: 'TOGGLE_FRUIT_FAVOURITE',
        fruitName
    };    
}

export const addNutrition=(fruitName)=>{
    return{
    type: 'ADD_NUTRITION',
    fruitName
    };
}


export const deleteNutrition=(index,fruitName)=>{
    return{
    type: 'DELETE_NUTRITION',
    index,
    fruitName
    };
}

export const editNutrition=(fruitName, newNutritions)=>{
    return{
    type: 'EDIT_NUTRITION',
    fruitName,
    newNutritions
    };
}

export const updateFruits=(fruits)=>{
    return{
    type: 'UPDATE_FRUITS',
    fruits
    }
}
export const fruitOnClick=(index)=>{
    return{
        type:'FRUIT_CLICK',
        index
    }
}
export const updateToken=(token)=>{
    return{
    type: 'UPDATE_TOKEN',
    token
    };
}