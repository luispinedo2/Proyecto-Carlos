import React from 'react'; // Importa React
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation de react-router-dom para la navegación
import { useAuth0 } from '@auth0/auth0-react'; // Importa el hook useAuth0 de Auth0 para la autenticación
import { useState } from 'react'; // Importa useState de React para manejar el estado

function NavBar2() {
    const location = useLocation(); // Obtiene la ubicación actual de la aplicación
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0(); // Obtiene información del usuario y métodos de autenticación de Auth0

    // Función para aplicar clase activa a los enlaces
    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    // Inicializa los roles del usuario
    let roles = ['default'];
    if (isAuthenticated) {
        roles = user['https://myroles.com/roles'] || []; // Obtiene los roles del usuario autenticado
    }

    const [liked, setLiked] = useState(false); // Define el estado "liked" para manejar el estado del botón "me encanta"

    // Función para manejar el click en el botón de me encanta
    const handleClick = () => {
        setLiked(!liked); // Invierte el estado de "liked"
    }

    return (
        <nav className="nav-lateral">
            <div className="container-lateral">
                <Link to="/" className="title-nav_lateral">GameVerse</Link> {/* Enlace a la página principal */}

                {/* Categorías de productos */}
                <div className="container-category">
                    <div className="dropdown">
                        <button
                            className="btn btn-category dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Categorias
                        </button>
                        <ul className="dropdown-menu menu-category" aria-labelledby="dropdownMenuButton">
                            <li><Link className="dropdown-item category-item" to="/categoria/action">Acción</Link></li>
                            <li><Link className="dropdown-item category-item" to="/categoria/adventure">Aventura</Link></li>
                            <li><Link className="dropdown-item category-item" to="/categoria/rpg">RPG</Link></li>
                            <li><Link className="dropdown-item category-item" to="/categoria/sports">Deportes</Link></li>
                            <li><Link className="dropdown-item category-item" to="/categoria/shooter">Shooter</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Formulario de búsqueda de productos */}
                <form className="container-form">
                    <input className="input-search" type="search" placeholder="Buscar productos" aria-label="Search" /> {/* Campo de búsqueda */}
                    <button className="btn-search" type="submit">
                        <i className="bi bi-search"></i> {/* Icono de búsqueda */}
                    </button>
                </form>

                {/* Mis compras */}
                <div className="container-compras">
                    <Link to="/MisCompras" className="title-nav__compras">
                        Mis Compras
                    </Link>
                </div>

                {/* Botón "me encanta" */}
                <div className="container-reaccion">
                    <button className="btn__encanta" onClick={handleClick}>
                        <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} ${liked ? 'heart-animate' : ''}`}></i> {/* Icono de corazón */}
                    </button>
                </div>

                {/* Autenticación */}
                {isAuthenticated ? (
                    <div className="navbar-nav nav-perfil">
                        <button className="btn btn-logout" onClick={() => logout()}>Cerrar Sesión</button> {/* Botón de cerrar sesión */}
                    </div>
                ) : (
                    <div className="navbar-nav nav-iniciar">
                        <button className="btn btn-login" onClick={() => loginWithRedirect()}>Iniciar Sesión</button> {/* Botón de iniciar sesión */}
                    </div>
                )}

                {/* Botón para abrir menú lateral en dispositivos móviles */}
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <i className="bi bi-list"></i> {/* Icono de lista */}
                </button>
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> {/* Botón para cerrar el menú lateral */}
                    </div>
                    {isAuthenticated ? (
                        <div className="container-user">
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="profile-img"
                            /> {/* Imagen de perfil */}
                            <span className="name-user">
                                {user.name}
                            </span>
                            <ul className="navbar-nav menu-list">
                                <li className="nav-item-user">
                                    <Link to="/perfil" className={isActive('/perfil')}>Perfil</Link> {/* Enlace al perfil */}
                                </li>
                                <li className="nav-item-user">
                                    <Link to="/settings" className={isActive('/settings')}>Configuración</Link> {/* Enlace a configuración */}
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <button className="btn-person-circle" onClick={() => loginWithRedirect()}>
                            <i class="bi bi-person-circle"></i>
                        </button>
                    )}

                    <div className="offcanvas-body">
                        <ul className="navbar-nav menu-list" aria-labelledby="dropdownMenuButton">
                            <li className="nav-item">
                                <Link to="/" className={isActive('/')}>Inicio</Link> {/* Enlace a Inicio */}
                            </li>
                            <li className="nav-item">
                                <Link to="/CompraProducto" className={isActive('/CompraProducto')}>Comprar Producto</Link> {/* Enlace a Comprar Producto */}
                            </li>
                            {roles.includes('admin') && ( /* Si el usuario tiene el rol de admin, muestra opciones adicionales */
                                <>
                                    <li className="nav-item">
                                        <Link to="/ListarProducto" className={isActive('/ListarProducto')}>Listar Productos</Link> {/* Enlace a Listar Productos */}
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/AgregarProducto" className={isActive('/AgregarProducto')}>Agregar Producto</Link> {/* Enlace a Agregar Producto */}
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/EliminarProducto" className={isActive('/EliminarProducto')}>Eliminar Producto</Link> {/* Enlace a Eliminar Producto */}
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/ModificarProducto" className={isActive('/ModificarProducto')}>Modificar Producto</Link> {/* Enlace a Modificar Producto */}
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/DetalleVenta" className={isActive('/DetalleVenta')}>Detalle de Venta</Link> {/* Enlace a Detalle de Venta */}
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Link to="/about" className={isActive('/about')}>Sobre nosotros</Link> {/* Enlace a Sobre nosotros */}
                            </li>
                            <li className="nav-item">
                                <Link to="/Politicas" className={isActive('/Politicas')}>Políticas de ventas y devolución</Link> {/* Enlace a Políticas de ventas y devolución */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavBar2; // Exporta el componente NavBar2
