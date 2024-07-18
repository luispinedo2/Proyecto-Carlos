import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Profile } from '../Profile/Profile'; // Ajusta esta importación según sea necesario

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">

            {/*ingresar la ubicacion del cliente*/}
            <div className="d-flex">
                <Link to="/Ubicacion" className="title-nav_lateral-ubicacion">
                    <i class="bi bi-geo-alt">

                    </i>
                    Ingresa tu ubicación

                </Link>
            </div>

        </nav >
    );
}

export default NavBar;



