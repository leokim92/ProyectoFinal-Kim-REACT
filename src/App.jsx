import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import { CartProvider } from "./context/ContextCart"
import Cart from "./components/Cart/Cart"
import Checkout from "./components/Checkout/Checkout"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <NavBar/>
          <Routes>
            <Route path="/" element={<ItemListContainer greeting='Traditional korean Folk Costume'/>} />
            <Route path="/category/:idCategory" element={<ItemListContainer greeting='Traditional korean Folk Costume'/>}/>
            <Route path="/item/:idItem" element={<ItemDetailContainer/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="*" element={<h2>Working for you</h2>} />

          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
