import React from 'react';
interface MyProps{
    Heading : string
    next ?: () => void
    handleSubmit ?: (e: { preventDefault: () => void; }) => void,
}
function Button(props : MyProps) {
    if(props.Heading !== "Offer Ride")
    {
    return (
        <div className="submit-container">
            <button className="submit" type="button" name="submit" onClick={props.handleSubmit}>Submit</button>
        </div>
    );
    }
    return (
        <div className="next-container">
            <button className="next"type="button" name="next" onClick={props.next}>Next >></button>
        </div>
    );
}

export default Button;