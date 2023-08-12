import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"


export const ItemDetailContainer = () => {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)

    const {itemId} = useParams()
    console.log(item);
    
    useEffect(() => {
        setLoading(true)

        //armar la ref
        const itemRef = doc(db, "productos", itemId)
        //llamar la ref
        getDoc(itemRef)
            .then((doc) => {
                setItem({
                    id: doc.id,
                    ...doc.data()
                })
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div>
            {
                loading
                    ? <h2>Cargando...</h2>
                    : <ItemDetail item={item}/>
            }
        </div>
    )
}