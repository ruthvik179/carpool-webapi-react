import React from 'react';
interface MyProps{
    handleChange : (event: { target: { name: any; value: any;}; },) => void
}
function Seats(props : MyProps) {
    const handleClick = (event : any) =>{
        var n = event.target.innerHTML.indexOf(">");
        var value = event.target.innerHTML.substring(n+1);
        const data ={ 
            target : {
                name : "seats",
                value : value,
            },
        };
        props.handleChange(data);
    }
    return (
        <div className="seats">
            <div className="seat-count">
                <label htmlFor="Seats">Seats Available</label>
            </div>
            <div className="button-group-pills text-center" data-toggle="buttons">
                <label className="btn btn-default" onClick={(e) => handleClick(e)}>
                    <input type="radio" name="seats"/>
                    1
                </label>
                <label className="btn btn-default" onClick={(e) => handleClick(e)}>
                    <input type="radio" name="seats"/>
                    2
                </label>
                <label className="btn btn-default" onClick={(e) => handleClick(e)}>
                    <input type="radio" name="seats"/>
                    3
                </label>
            </div>
        </div>
    );
}

export default Seats;