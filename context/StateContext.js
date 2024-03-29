import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return (prevQty - 1);
        })
    }

    const onAdd = (product, quantity) => {

        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }])
        }

        toast.success(`${qty} ${product.name} added to cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems);
    }

    const toogleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            
            // let newCartItems = [...cartItems, {...product, 
            //     quantity: product.quantity + 1
            // }]

            //Was Changing order in items in cart.But code ok

            // setCartItems([...newCartItems, {
            //     ...foundProduct,
            //     quantity: foundProduct.quantity + 1
            // }]);

            //Works but Mutating state
            setCartItems([...newCartItems.slice(0, index), {...foundProduct, quantity: foundProduct.quantity + 1}, ...newCartItems.slice(index)])

            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
            // foundProduct.quantity += 1;
            // cartItems[index] = foundProduct;
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                // setCartItems([...newCartItems, {
                //     ...foundProduct,
                //     quantity: foundProduct.quantity - 1
                // }]);

                setCartItems([...newCartItems.slice(0, index), {...foundProduct, quantity: foundProduct.quantity - 1}, ...newCartItems.slice(index)])

                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                setShowCart,
                incQty,
                decQty,
                onAdd,
                onRemove,
                toogleCartItemQuantity,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)