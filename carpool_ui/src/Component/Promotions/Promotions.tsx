import React from 'react';
import { Card } from 'reactstrap';
import { PromotionsConstants } from '../../Constants/PromotionsConstants';
import { Promotion } from '../../Interfaces/Promotion/Promotion';
var promotionsConstants = new PromotionsConstants();
interface MyProps{
    handleChange : (event: { target: { name: any; value: any;};} ) => void
    handleSubmit : (e: { preventDefault: () => void; }) => void
    error : string
    defaultValues : Promotion
}
function Promotions(props : MyProps) {
    return (
        <Card>
            <div className="heading">
                    <h1>{promotionsConstants.PromotionsHeading}</h1>
                </div>
                    {props.error ? <p className="error">{props.error}</p> : null}
                <div className="discount">
                    <label htmlFor="Discount">{promotionsConstants.DiscountLabel}</label>
                    <input type="text" id="discount" name="discount" placeholder={promotionsConstants.DiscountPlaceholder} defaultValue={props.defaultValues.discount} onChange = {(e)=>props.handleChange(e)}/>
                </div>
                <div className="distance">
                    <label htmlFor="Distance">{promotionsConstants.DistanceLabel}</label>
                    <input type="text" id="distance" name="distance" placeholder={promotionsConstants.DistancePlaceholder} defaultValue={props.defaultValues.distance} onChange = {(e)=>props.handleChange(e)}/>
                </div>
                <div className="submit-container">
                        <button className="submit" type="button" name="submit" onClick={props.handleSubmit}>Submit</button>
                </div>
        </Card>
    );
}

export default Promotions;