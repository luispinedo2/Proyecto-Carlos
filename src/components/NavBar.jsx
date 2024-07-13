// NavBar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav menu-list">


                        <li className="nav-item">
                            <Link to="/" className={isActive('/Home')}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className={isActive('/about')}>Sobre nosotros</Link>
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
                        <li className="nav-item">
                            <Link to="/Politicas" className={isActive('/Politicas')}>Politicas de ventas y devolución</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/CompraProducto" className={isActive('/CompraProducto')}>Comprar Producto</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/DetalleVenta" className={isActive('/DetalleVenta')}>Detalle de Venta</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
