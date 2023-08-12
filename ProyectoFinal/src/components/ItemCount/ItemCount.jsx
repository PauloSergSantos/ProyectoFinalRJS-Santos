import { useState } from "react"


export const ItemCount = ({max, counter, setCounter, agregar}) => {

    const handleRestar = () => {
        counter > 1 && setCounter(counter -1)
    }

    const handleSumar = () => {
        counter < max && setCounter(counter + 1)
    }

    return (
        <div>
            <button onClick={handleRestar} className="btn btn-outline-primary">-</button>
            <span className="mx-2">{counter}</span>
            <button onClick={handleSumar} className="btn btn-primary">+</button>
            <br />
            <button onClick={agregar} className="btn btn-success">Agregar</button>
        </div>
    )
}