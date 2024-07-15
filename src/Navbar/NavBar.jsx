import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Profile } from '../Profile/Profile'; // Ajusta esta importación según sea necesario

function NavBar() {
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
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container_navbar">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav menu-list">
                        <li className="nav-item">
                            <Link to="/" className={isActive('/')}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className={isActive('/about')}>Sobre nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Politicas" className={isActive('/Politicas')}>Políticas de ventas y devolución</Link>
                        </li>

                        {roles.includes('admin') && (
                            <>
                                <li className="nav-item">
                                    <Link to="/ListarProducto" className={isActive('/ListarProducto')}>Listar Productos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/AgregarProducto" className={isActive('/AgregarProducto')}>Agregar Producto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/EliminarProducto" className={isActive('/EliminarProducto')}>Eliminar Producto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/ModificarProducto" className={isActive('/ModificarProducto')}>Modificar Producto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/DetalleVenta" className={isActive('/DetalleVenta')}>Detalle de Venta</Link>
                                </li>
                            </>
                        )}

                        <li className="nav-item">
                            <Link to="/CompraProducto" className={isActive('/CompraProducto')}>Comprar Producto</Link>
                        </li>
                    </ul>

                    {isAuthenticated ? (
                        <div className="navbar-nav ml-auto">
                            <div className="dropdown">
                                <img
                                    src={user.picture}
                                    alt="Profile"
                                    className="profile-img dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                />
                                <ul className="dropdown-menu">
                                    <li>
                                        <Profile />
                                    </li>
                                    <li>
                                        <Link to="/settings" className="dropdown-item">Configuraciones</Link>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => logout({ returnTo: window.location.origin })}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto nav-iniciar">
                            <button className="btn btn-primary" onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;



