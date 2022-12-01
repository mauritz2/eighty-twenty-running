import React from "react";
import PropTypes from "prop-types";

const Button = ({text, buttonColor, onClick, trainingPlanId, textColor}) => {
    // Default button used to learn more about plans and select new plans
    return(
        <input
            className="btn"
            type="button"
            onClick={ () => onClick(trainingPlanId)}
            style={{backgroundColor: buttonColor, color:textColor}}
            value={text}/>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    trainingPlanId: PropTypes.string
}

Button.defaultProps = {
    textColor: "#000"
}

export default Button;

