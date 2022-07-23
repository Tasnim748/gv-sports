import React from "react";
import './spinner.css';

const Spinner = () => {
    return(
        <div style={{marginTop: '50px'}}>
            <h3 style={{textAlign: 'center'}}>Please wait ...</h3>
            <div className="loader"></div>
        </div>
        
    );
}

export default Spinner;