import { useState } from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'
import { CartContext } from '../../context/ContextCart'
import { useContext } from 'react'

const ItemDetail = ({id, name, stock, price, img}) => {

  const [addQty, setAddQty] = useState (0);

  const {addToCart} = useContext(CartContext);

  const qtyControl = (qty) => {
    setAddQty (qty);
    
    const item = {id, img, name, price};
    addToCart(item, qty);
  }
  
  return (
    <div className='itemCont'>
        <h2> {name}</h2>
        <img src={img} alt={name} />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia dolores molestiae sunt sit? Corrupti sequi officia, perspiciatis, voluptate nulla excepturi sed placeat error omnis, iusto qui! Accusantium assumenda numquam beatae!</p>
        <p>ID: {id}</p>
        <p>Price: {price}</p>

        {
          addQty > 0 ? (<Link className='Finish' to='/cart'> Finish Shopping</Link>) : (<ItemCount initial={1} stock= {stock} addFunction={qtyControl}/>)
        }

    </div>
  )
}

export default ItemDetail