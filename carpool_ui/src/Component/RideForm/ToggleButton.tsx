import React from 'react';

function ToggleButton() {
    return (
        <div className="custom-control custom-switch book-toggle">
            <input type="checkbox" className="custom-control-input" id="customSwitches"></input>
            <label className="custom-control-label" htmlFor="customSwitches"/>
        </div>
    );
}

export default ToggleButton