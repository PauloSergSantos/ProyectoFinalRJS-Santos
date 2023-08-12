import { useState, useContext } from "react"
import { ItemCount } from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import "./ItemDetail.scss"

export const ItemDetail = ({item}) => {
    const {cart, setCart, IsInCart} = useContext(CartContext)
    const [cantidad, setCantidad] = useState(1)

    console.log(IsInCart(item.id));

    const handleAgregar = () => {
        const newItem = {
            ...item,
            cantidad,
        }
        
        setCart( [
            ...cart, 
            newItem
        ])
    }

    return (
        <div className="container my-5 plantas_item_detail">
            <h2>{item.nombre}</h2>
            <img src={item.img} alt={item.nombre} />
            <p>{item.descripcion}</p> 
            <b>Precio: ${item.precio}</b>

            {
                IsInCart(item.id)
                    ? <Link className="btn btn-success" to="/cart">Terminar mi compra</Link>
                    : <ItemCount
                        max={item.stock} 
                        counter={cantidad}
                        setCounter={setCantidad}
                        agregar={handleAgregar}
                        />
            }
            <Link className="btn btn-primary" to="/">Buscar más plantas</Link>
        </div>
    )
}