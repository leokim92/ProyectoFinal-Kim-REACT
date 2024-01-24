import LogInBar from "../LogInBar/LogInBar"
import './NavBar.css'
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
    const logo = 'https://thumb.mt.co.kr/06/2015/09/2015092316215415842_1.jpg/dims/optimize/'

  return (
    <header>
        <div className="logoContainer">

          <Link to='/'>
            <h1>Kim Folk Costume</h1>
         </Link>

        <img className="logo" src={logo} alt="habok logo" />
        </div>

        <nav>
            <ul>
                <li><NavLink to="*" element={<h2>Working for you</h2>}>tailored</NavLink></li>
                <li><NavLink to="*" element={<h2>Working for you</h2>}>rent</NavLink></li>
                <li><NavLink to="*" element={<h2>Working for you</h2>}>2024 fashion now!</NavLink></li>
                <li><NavLink to='category/1'>man</NavLink></li>
                <li><NavLink to='category/2'>woman</NavLink></li>
                <li><NavLink to='category/3'>children</NavLink></li>
            </ul>
        </nav>

        <LogInBar/>
        
    </header>
  )
}

export default NavBar