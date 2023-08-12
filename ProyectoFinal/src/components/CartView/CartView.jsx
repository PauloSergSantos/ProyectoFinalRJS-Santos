import {useContext} from "react"
import {CartContext} from "../../context/CartContext"
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "./CartView.scss"

export const CartView = () => {
    const { cart,totalCompra, vaciarCarrito, removerDelCarrito } = useContext(CartContext)

    return (
        <div className="container my-2">
            <h2>Tu compra</h2>
            <hr />
            <div className="row cartview_flex">
                {
                    cart.map((item) => (
                        <div className="col-3 m-2 cart_view_div" key={item.id}>
                            <h2>{item.nombre}</h2>
                            <img src={item.img} alt={item.nombre} />
                            <p>Precio del producto: ${item.precio}</p>
                            <p>Precio total: ${item.precio * item.cantidad}</p>
                            <p>Cantidad: {item.cantidad}</p>
                            <button onClick={() => removerDelCarrito(item.id)} className="btn btn-danger"><FaTrashAlt /></button>
                        </div>
                    )) 
                }
            </div>
            <div>
                <h4>Total de la compra: ${totalCompra()}</h4>
                <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar Carrito</button>
                <Link className="btn btn-success mx-2" to="/checkout">Terminar mi compra</Link>
                <Link className="btn btn-primary" to="/">Buscar más plantas</Link>
            </div>
        </div>
    )
}