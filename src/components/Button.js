import React from "react"

const Button = ({text, color, onViewClick}) => {

    return(
        <button onClick={ () => onViewClick()} style={{backgroundColor: color}}>{text}</button>
    )

}

export default Button;