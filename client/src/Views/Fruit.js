import React, { useState } from "react"
import Footer from "../Components/Footer"
import PropTypes from 'prop-types'
import {
    Link
  } from "react-router-dom"
const Fruit = ({ url,fruits, user_token,favFruits}) => {
    return (
        <div style={{paddingBottom:"60px"}}>
            <h1>Fruits list</h1>
            <div className="topbar__container">
                <span className='topbar__allFruits'>
                    <Link to={"/"+user_token+"/Fruits"} className="topbar__link" >All fruits</Link>
                </span>
                <span className="topbar__fav">
                    <Link to={"/"+user_token+"/Fruits/fav"}  className="topbar__link">Favorites</Link>
                </span>
            </div>  
            <div className="fruit_list">
            <ul className="ul_fruit">
            {fruits.map(
                (value)=>
                        <Link to={url+"/FruitDetails/"+value} className="fruit_link"  >
                        <li className="li_fruit"> {value}</li></Link> )}
            </ul>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default Fruit