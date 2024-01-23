import { useContext } from "react"
import { CartContext } from "../../context/ContextCart"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"

const Cart = () => {
    const {cart, eraseCart, total, totalQty} = useContext(CartContext);

    if(totalQty === 0 ) {
        return (
            <>
                <h2>Cart is Empty!</h2>
                <Link to="/"> Ver Productos </Link>
            </>
        )
    }

  return (
    <div>
        {
            cart.map(product => <CartItem key={product.item.id} {...product}/>)
        }
        <h3>Total: $ {total}</h3>
        <h3>Total Quantity: {totalQty}</h3>
        <button onClick={() => eraseCart()}> Empty Cart </button>
        <Link to="/checkout"> Go to Pay </Link>
    </div>
  )
}

export default Cart