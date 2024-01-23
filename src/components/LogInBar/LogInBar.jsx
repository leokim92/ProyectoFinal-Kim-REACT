import './LogInBar.css';
import { useContext } from 'react';
import { CartContext } from "../../context/ContextCart"
import { Link } from 'react-router-dom';

const LogInBar = () => {
    const {totalQty} = useContext(CartContext)

    const bagImg = 'https://cdn-icons-png.flaticon.com/512/2662/2662503.png'
    const magGlass = 'https://static-00.iconduck.com/assets.00/magnifying-glass-icon-2048x2048-3qmsqqer.png'
    
  return (
    <div className='logInBar'>
        <button className='logIn'>log in</button>
        <input className='search' type="" />
        <img className='magGlass' src={magGlass} alt="magnifying glass" />
        {/* <img className='bagImg' src={bagImg} alt="buying bag" /> */}
        <Link to="/cart"> 
            <img className='bagImg' src={bagImg} alt="buying bag" />
            {
              totalQty > 0 && <strong> {totalQty} </strong>
            }
        </Link>
    </div>
  )
}

export default LogInBar