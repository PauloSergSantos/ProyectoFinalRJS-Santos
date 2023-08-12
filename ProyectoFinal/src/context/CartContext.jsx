import { createContext, useEffect, useState } from "react";



export const CartContext = createContext()
    
const init = JSON.parse(localStorage.getItem('cart')) || []

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(init)
    console.log(cart);

    const IsInCart = (id) => {
        return cart.some((item) => item.id === id)
    }

    //funcion para el total de la compra
    const totalCompra = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    }

    //funcion para el total de la cantidad de productos en el widget 
    const totalCantidad = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0)
    }

    //funcion para borrar todos los productos del carrito
    const vaciarCarrito = () => {
        setCart([])
    }

    //funcion para remover un producto del carrito
    const removerDelCarrito = (id) => {
        setCart(cart.filter((item) => item.id != id))
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            IsInCart,
            totalCompra,
            vaciarCarrito,
            totalCantidad,
            removerDelCarrito
        }}>
            {children}
        </CartContext.Provider>
    )
}