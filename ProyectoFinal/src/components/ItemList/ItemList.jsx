import {ItemCard} from '../ItemCard/ItemCard'
import "./ItemList.scss"

export const ItemList = ({productos}) => {

    return (
        <div className="container">
            <h2>Productos</h2>
            <hr />

            <div className='row planta'>
                {
                    productos.map((prod) => <ItemCard key={prod.id} item={prod}/>)
                        
                    
                }
            </div>
        </div>
    )
}