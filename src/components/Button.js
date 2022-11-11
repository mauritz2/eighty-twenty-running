import React from "react"

const Button = ({text, color, onClick, trainingPlanId}) => {

    return(
        <input className="btn" type="button" onClick={ () => onClick(trainingPlanId)} style={{backgroundColor: color}} value={text} />
    )
}

export default Button;