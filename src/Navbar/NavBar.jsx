import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function NavBar() {
    const location = useLocation();


    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    let roles = ['default'];
    if (isAuthenticated) {
        roles = user['https://myroles.com/roles'];
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav menu-list">
                        <li className="nav-item">
                            <Link to="/" className={isActive('/')}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className={isActive('/about')}>Sobre nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Politicas" className={isActive('/Politicas')}>Politicas de ventas y devolución</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/CompraProducto" className={isActive('/CompraProducto')}>Comprar Producto</Link>
                        </li>
                        {roles.includes('admin') && (
                            <>
                                <li className="nav-item">
                                    <Link to="/DetalleVenta" className={isActive('/DetalleVenta')}>Detalle de Venta</Link>
                                </li>
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
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;