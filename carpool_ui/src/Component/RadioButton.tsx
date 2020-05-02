import React from 'react';
interface MyProps{
    handleClick : (event : any) => void;
    defaultValue : string;
    name : string;
}
function RadioButton(props : MyProps) {
    return (
        <label className="btn btn-default" onClick = {(e)=>props.handleClick(e)} defaultValue={props.defaultValue}>
            <input type="radio" name={props.name}/>
            {props.defaultValue}
        </label>
    );
}

export default RadioButton;