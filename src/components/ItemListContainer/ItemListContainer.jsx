import './ItemListContainer.css';
import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { db } from '../../services/config';
import { collection, getDocs, where, query } from 'firebase/firestore';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const { idCategory } = useParams();

  useEffect(() => {
    const myProducts = idCategory ? query(collection(db, "inventory"), where("idCat", "==", idCategory)) : collection(db, "inventory");

    getDocs(myProducts)
      .then(res => {
        const newProducts = res.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data }
        })
        setProducts(newProducts);
      })
      .catch(error => console.log("Error", error))
  }, [idCategory])

  return (
    <div>
      <h2>{greeting}</h2>
      <h2>My products</h2>
      <ItemList products={products} />
    </div>
  )
}

export default ItemListContainer