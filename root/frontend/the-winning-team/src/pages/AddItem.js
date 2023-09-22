import React from 'react';
import '../css/popups/AddItem.css';

function AddItem(props) {
  return (props.trigger) ? (
        <div id="additem">
            <div className="additem-container">
                <button className="close-btn" 
                    onClick={props.SetTrigger}>
                    <img className="close-icon" src={require(`../assets/images/icons/close_icon.jpeg`)} /> 
                </button>
                <div className="additem-header">
                    <h1>Add a new {props.info.name}</h1>
                </div>
                <form>
                    <div className="additem-input">
                        <label for="name">{props.info.name} Name:</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <button type="submit" className="blue-btn">Add {props.info.name}</button>
                </form>
            </div>
        </div>
    ) : "";
}

export default AddItem;
