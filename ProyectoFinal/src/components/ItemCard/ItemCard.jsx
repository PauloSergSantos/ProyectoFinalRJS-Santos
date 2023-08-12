import { Link } from "react-router-dom"
import "./ItemCard.scss"

export const ItemCard = ({item}) => {

    return (
        <div className='col-3 m-2 plantas_item_card'>
            <h4 className="plantas_item_card_h4">{item.nombre}</h4>
            <img src={item.img} alt={item.nombre} />
            <p>{item.descripcion}</p>
            <b>Precio: ${item.precio}</b>
            {
                item.stock < 10
                ? <p>Quedan solo {item.stock} unidades</p>
                : null
            }
            <Link className="btn btn-primary" to={`/detail/${item.id}`} >Ver más</Link>
        </div>
    )
}