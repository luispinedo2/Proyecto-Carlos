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

        <nav class="navbar bg-body-tertiary nav-lateral">
            <div class="container-fluid">
                <Link to="/" class="navbar-brand">GameVerse</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <button class="nav-link active" onClick={() => { }}>Home</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" onClick={() => { }}>Link</button>
                            </li>
                            <li class="nav-item dropdown">
                                <button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                Dropdown
                                <ul class="dropdown-menu">
                                    <li><button class="dropdown-item" onClick={() => { }}>Action</button></li>
                                    <li><button class="dropdown-item" onClick={() => { }}>Another action</button></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><button class="dropdown-item" onClick={() => { }}>Something else here</button></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="d-flex mt-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar2;



