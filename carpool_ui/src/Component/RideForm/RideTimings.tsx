import React from 'react';
interface MyProps{
    handleChange : (event: any) => void
}
function Timings(props : MyProps) {
    const handleClick = (event : any) =>{
        var n = event.target.innerHTML.indexOf(">");
        var value = event.target.innerHTML.substring(n+1);
        const data ={ 
            target : {
                name : "time",
                value : value,
            },
        };
        props.handleChange(data);
    }
    return (
        <div>
            <div className="time">
                <label htmlFor="Time">Time</label>
            </div>
            <div className="button-group-pills text-center" data-toggle="buttons">
                <label className="btn btn-default" onClick = {(e)=>handleClick(e)} defaultValue="5AM - 9AM">
                    <input type="radio" name="time"/>
                    5AM - 9AM
                </label>
                <label className="btn btn-default" onClick = {(e)=>props.handleChange(e)} defaultValue="9AM - 12PM">
                    <input type="radio" name="time"/>
                    9AM - 12PM
                </label>
                <label className="btn btn-default" onClick = {(e)=>props.handleChange(e)} defaultValue="12PM- 3PM">
                    <input type="radio" name="time"/>
                    12PM - 3PM
                </label>
                <label className="btn btn-default" onClick = {(e)=>props.handleChange(e)} defaultValue="3PM - 6PM">
                    <input type="radio" name="time" />
                    3PM - 6PM
                </label>
                <label className="btn btn-default" onClick = {(e)=>props.handleChange(e)} defaultValue="6PM - 9PM">
                    <input type="radio" name="time" />
                    6PM - 9PM
                </label>
            </div>
        </div>
    );
}

export default Timings;




