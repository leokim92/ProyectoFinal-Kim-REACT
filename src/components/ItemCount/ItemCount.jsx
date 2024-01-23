import { useState } from "react"
import './ItemCount.css'

const ItemCount = ({initial, stock, addFunction}) => {
    const [counter, setCounter] = useState (initial);

    const  addCount = () => {
        if(counter < stock){
        setCounter (counter + 1);
        }
    }

    const subCount = () => {
        if (counter > initial) {
            setCounter (counter - 1);
        }
    }

  return (
    <div className="addAndSub">
        <button onClick={subCount}> - </button>
        <p> {counter} </p>
        <button onClick={addCount}> + </button>
        <button onClick={() => addFunction(counter)}>Add to cart</button>
    </div>
  )
}

export default ItemCount