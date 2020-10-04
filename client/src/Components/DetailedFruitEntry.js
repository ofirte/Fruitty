import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'

function DetailedFruitEntry(props){
    function changeTitle (event) {
        props.nutritionTitleChanged(event.target.value)
        // console.log(this)
    }
    function changeValue (event) {
        props.nutritionValueChanged(event.target.value)
        // console.log(this)
    }
    if(props.from==="nutrition"){  
    return (
    <div>
        <th >{props.editable?
            <input className="entryTilte" type="text" onChange={changeTitle} value={props.title}></input>:
            <input className="entryTilte" readonly="true" type="text" onChange={changeTitle} value={props.title}></input>}</th>
        <td>{props.editable?
            <input className="entryValue" type="text" onChange={changeValue} value={props.value}></input>:
            <input className="entryValue" readonly="true" onChange={changeValue} value={props.value}></input>}
        <FontAwesomeIcon className="eraserIcon" style={{display:props.editable?"inline":"none"}}  icon={faEraser} onClick={props.onDelClick}></FontAwesomeIcon></td> 
    </div>
    )
    }
    else{
        return (
            <div>
              <th>
                  {props.title}  </th><td>{props.value}</td>
             
            </div>
            )
    }
}
export default DetailedFruitEntry