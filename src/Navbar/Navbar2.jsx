import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Profile } from '../Profile/Profile'; // Ajusta esta importación según sea necesario

function NavBar2() {
    const location = useLocation();
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

    // Función para aplicar clase activa a los enlaces
    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    // Obtiene los roles del usuario
    let roles = ['default'];
    if (isAuthenticated) {
        roles = user['https://myroles.com/roles'] || [];
    }

    return (

        <nav className="navbar bg-body-tertiary nav-lateral">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand title-nav_lateral">GameVerse</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <button className="nav-link active" onClick={() => { }}>Home</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => { }}>Link</button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                Dropdown
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={() => { }}>Action</button></li>
                                    <li><button className="dropdown-item" onClick={() => { }}>Another action</button></li>
                                    <li>
                                        <hr classNameName="dropdown-divider" />
                                    </li>
                                    <li><button className="dropdown-item" onClick={() => { }}>Something else here</button></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex mt-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar2;



