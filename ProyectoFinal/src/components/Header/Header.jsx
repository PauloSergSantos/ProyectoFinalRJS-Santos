import { CartWidget } from '../CartWidget/CartWidget'
import './Header.scss'
import {Link} from 'react-router-dom'


export const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__logo">Macetas y Raíces</h1>
                <nav className="navbar">
                    <Link className="navbar__link" to="/">Inicio</Link>
                    <Link className='navbar__link' to="/productos/interior">Plantas de interior</Link>
                    <Link className='navbar__link' to="/productos/exterior">Plantas de exterior</Link>
                    <Link className='navbar__link' to="/productos/decoracion">Decoración</Link>
                    <CartWidget/>
                </nav>
            </div>
        </header>
    )
} 