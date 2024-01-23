import { useContext } from "react";
import { CartContext } from "../../context/ContextCart";

const CartItem = ({item, qty}) => {
    const {deleteProduct} = useContext(CartContext);

  return (
    <div>
        <h4>{item.name}</h4>
        <p>Qty: {qty}</p>
        <p>Price: {item.price}</p>
        <button onClick={()=> deleteProduct(item.id)}> Delete Product</button>
        <hr />
    </div>
  )
}

export default CartItem