import { useState, createContext } from "react"

export const CartContext = createContext({
    cart: [],
    total: 0,
    qty: 0,
})

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState ([]);
    const  [total, setTotal] = useState(0);
    const [totalQty, setTotalQty] = useState (0);

    //Verificar por consola: (despues se borra)
    console.log(cart);
    console.log("Items Qty: ", totalQty);
    console.log("Total Price of Purchase: ", total);

    const addToCart = (item, qty) =>{
        const productOnList = cart.find(prod => prod.item.id === item.id);

        if (!productOnList) {
            setCart(prev => [...prev, {item, qty}]);
            setTotalQty(prev => prev + qty);
            setTotal( prev => prev + (item.price *qty) );
        } else {
            const updatedCart = cart.map (prod => {
                if(prod.item.id === item.id) {
                    return {...prod, qty: prod.qty + qty}
                } else {
                    return prod;
                }
            })
            setCart(updatedCart);
            setTotalQty(prev => prev + qty);
            setTotal( prev => prev + (item.price *qty) );
        }
    }

    const deleteProduct = (id) => {
        const eliminatedProduct = cart.find(prod => prod.item.id === id);
        const updatedCart = cart.filter(prod => prod.item.id !== id) ;

        setCart (updatedCart);
        setTotalQty(prev => prev - eliminatedProduct.qty);
        setTotal(prev => prev - (eliminatedProduct.item.price * eliminatedProduct.qty));
    }

    const eraseCart = () => {
        setCart ([]);
        setTotalQty (0);
        setTotal (0);
    }

    return (
        <CartContext.Provider value={{cart, total, totalQty, addToCart, deleteProduct, eraseCart}}>
            {children}
        </CartContext.Provider>
    )
}

