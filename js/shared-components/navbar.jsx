import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './navbar.scss'
import menuIcon from '../../img/icn_menu_dark.svg';
import logoIcon from '../../img/icn_grind.svg';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav>
                {/* <img src={logo}></img> */}
                <div className="logo-box">
                    <img class="logo-image" src={logoIcon}></img>                      
                    <Link to="/"><h1 className="title desktop-only">Nastaunik.info - тулкіт</h1></Link>
                </div>
                <div className="header-nav">
                    <div className="header-nav-inner">
                        <button className="nav-button mobile-only">
                            <img src={menuIcon}></img>                            
                        </button>
                        <div className="header-nav-title mobile-only"><Link to="/"><h1>Тулкіт</h1></Link></div>
                    </div>
                    <ul>
                        <li><Link to="/">Галоўная</Link></li>
                        <li><Link to="/authors">Аўтары</Link></li>
                        <li><Link to="/about">А праекце</Link></li>
                        <li><Link to="/help">Падтрымаць</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}