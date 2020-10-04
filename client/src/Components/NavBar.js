import React from "react"
import {

    Link
  } from "react-router-dom"
function NavBar(props){
    return (
  <div className="topbar__container">
  <span className='topbar__allFruits'>
      <Link to= {"/"+props.token+"/Fruits"} className="topbar__link" >All fruits</Link>
  </span>
  <span className="topbar__fav">
      <Link to={"/"+props.token+"/Fruits/fav"} className="topbar__link">Favorites</Link>
  </span>
</div>  
    )
}
export default NavBar