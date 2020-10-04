import React,{ Component } from 'react'; 
import './App.css';
import './Views/Login'
import Login from './Views/Login';

import {
  HashRouter as Router,
  Switch,
  Route
} 
from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './Reducers/index'
import DetFruitContainer from "./Containers/DetFruitContainer"
import { Provider } from 'react-redux'
import FruitsContainer from './Containers/FruitContainer';
import DataLoadContainer from './Containers/DataLoadContainer'
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
class App extends Component {

 
  render(){
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
        <Route exact path="/">
          <Login store={store}></Login>
        </Route>
        <Route path="/:token" >
          <DataLoadContainer store={store}></DataLoadContainer>
          <Route exact path="/:token/Fruits">
            <FruitsContainer store={store} favoriets={false}></FruitsContainer>
          </Route>
          <Route exact path="/:token/Fruits/fav">
            <FruitsContainer store={store} favoriets={true}></FruitsContainer>
          </Route>
          <Route exact path="/:token/Fruits/FruitDetails/:name" component={DetFruitContainer}></Route>
          <Route exact path="/:token/Fruits/fav/FruitDetails/:name" component={DetFruitContainer}></Route>

        </Route>
      </Switch>
      </Router>
      </Provider>
    </div>
  );
}
}


export default App;
