import React from "react"

const Button = ({text, color, onClick, trainingPlanId}) => {

    return(
        <button onClick={ () => onClick(trainingPlanId)} style={{backgroundColor: color}}>{text}</button>
    )

}

export default Button;