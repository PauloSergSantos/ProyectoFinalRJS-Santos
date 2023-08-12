import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, addDoc, getDoc, updateDoc, doc,writeBatch, getDocs, query, where, documentId } from "firebase/firestore"
import { db } from "../../firebase/config"
import { Link, Navigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from 'yup'


const schema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, "El nombre es demasiado corto")
                .max(20, "Maximo 20 caracteres")
                .required("Este campo es obligatorio"),
    direccion: Yup.string()
                .min(6, "La dirección es demasiado corta")
                .max(20, "Maximo 20 caracteres")
                .required("Este campo es obligatorio"),
    email: Yup.string()
                .required("Este campo es obligatorio")
                .email("El email es invalido")
})


export const Checkout = () => {
    const {cart, totalCompra, vaciarCarrito} = useContext(CartContext)

    const [orderId, setOrderId] = useState(null)

    const handleSubmit = async (values) => {
        
        const orden = {
            cliente: values,
            item: cart.map(item => ({
                id: item.id, 
                nombre: item.nombre, 
                precio: item.precio, 
                cantidad: item.cantidad
            })),
            total: totalCompra(),
            fyh: new Date()
        }
        console.log(orden)
        
        //lote de escritura
        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")
        const productosRef = collection(db, "productos")
        const q = query(productosRef, where( documentId(), "in", cart.map(item => item.id)))

        const productos = await getDocs(q)
        const outStock = []

        productos.docs.forEach((doc) => {
            const item = cart.find(prod => prod.id === doc.id)
            const stock = doc.data().stock //stock del documento

            //si hay disponibilidad ejecuto una orden de actualización
            if (stock >= item.cantidad) {
                batch.update(doc.ref, {
                    stock: stock - item.cantidad
                })
            }else{
                outStock.push(item)
            }
        })

        if (outStock.length === 0) {
            await batch.commit()
            const doc = await addDoc(ordersRef,orden)

            vaciarCarrito()
            setOrderId(doc.id)
        }else {
            alert("Hay items sin stock")
        }

        //enviar a firebase
        /* const ordersRef = collection(db, 'orders')

        addDoc(ordersRef, orden)
            .then((doc) =>{
                console.log(doc.id)
                vaciarCarrito()
                setOrderId(doc.id)
            }) */
    }

    if (orderId) {
        return (
            <div className="container my-5">
                <h2>Tu compra se registró exitosamente!</h2>
                <hr />
                <p>Tu número de order es <strong>{orderId}</strong></p>

                <Link className="btn btn-success" to="/">Volver</Link>
            </div>
        )
    }

    if (cart.length === 0) {
        return <Navigate to="/" />
    }

    return (
        <div className="container my-5">
            <h2>Checkout</h2>
            <hr />

            <Formik
                initialValues={{
                    nombre: '',
                    direccion: '',
                    email: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={schema}
            >
                {() => (
                    <Form>
                        <Field placeholder="Nombre" className="form-control my-2" type="text" name="nombre"></Field>
                        <ErrorMessage name="nombre" component="p"/>
                        <Field placeholder="Dirección" className="form-control my-2" type="text" name="direccion"></Field>
                        <ErrorMessage name="direccion" component="p"/>
                        <Field placeholder="email" className="form-control my-2" type="email" name="email"></Field>
                        <ErrorMessage name="email" component="p"/>
                        <button className="btn btn-success" type="submit">Enviar</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}