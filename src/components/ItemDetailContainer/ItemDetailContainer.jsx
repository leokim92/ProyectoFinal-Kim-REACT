import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { db } from "../../services/config";
import { getDoc, doc } from "firebase/firestore";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const {idItem} = useParams();

    useEffect ( () => {
      const newDoc = doc(db, "inventory", idItem);

      getDoc (newDoc)
      .then(res => {
        const data = res.data();
        const newProduct = {id: res.id, ...data};
        setProduct(newProduct);
      })
      .catch(error => console.log("error", error))
    }, [idItem])

  return (
    <div>
        <ItemDetail {...product}/>
    </div>
  )
}

export default ItemDetailContainer