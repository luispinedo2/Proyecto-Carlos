import React from 'react'; // Importa React
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Importa el hook useAuth0 de Auth0 para la autenticación
import { useState } from 'react'; // Importa useState de React para manejar el estado

function NavBar2() {
    const location = useLocation(); // Obtiene la ubicación actual de la aplicación
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0(); // Obtiene información del usuario y métodos de autenticación de Auth0
    const [searchTerm, setSearchTerm] = useState('');


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
    const clickReaccion = () => {
        setLiked(!liked); // Invierte el estado de "liked"
    }

    const BuscarCategoria = (category) => {
        navigate(`/?category=${category}`);
    };


    const BuscarProducto = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/search?query=${searchTerm}`);
        }
    };

    return (
        <nav className="nav-lateral">
            <div className="container-lateral">
                <Link to="/" className="title-nav_lateral">

                    GameVerse
                    <i className="bi bi-controller"></i></Link> {/* Enlace a la página principal */}

                {/* Categorías de productos */}
                <div className="d-block container-category">
                    <div className="dropdown">
                        <button
                            className="btn btn-category dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className='title-category'>
                                Categorías
                            </span>
                        </button>
                        <ul className="dropdown-menu menu-category" aria-labelledby="dropdownMenuButton">

                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Plataformas')}>Plataformas</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Battle Royale')}>Battle Royale</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Aventura')}>Aventura</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Arcade')}>Arcade</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Acción')}>Acción</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Tiro')}>Tiro</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('FPS')}>FPS</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('TPS')}>TPS</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Supervivencia')}>Supervivencia</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Terror')}>Terror</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Deportes')}>Deportes</span></li>
                            <li><span className="dropdown-item category-item" onClick={() => BuscarCategoria('Lucha')}>Lucha</span></li>
                        </ul>
                    </div>
                </div>

                {/* Formulario de búsqueda de productos */}
                <form className="" onSubmit={BuscarProducto}>
                    <div className='container-form'>
                        <input className="input-search" type="search" placeholder="Buscar productos" aria-label="Search"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> {/* Campo de búsqueda */}
                        <button className="btn-search" type="submit">
                            <i className="bi bi-search"></i> {/* Icono de búsqueda */}
                        </button>
                    </div>
                </form>

                {/* Mis compras */}
                {isAuthenticated ? (

                    <Link to="/MisCompras" className="title-nav__compras">
                        Mis Compras
                    </Link>
                ) : (
                    <div className='container-compras'></div>
                )}

                {/* Botón "me encanta" */}
                <div className="container-reaccion">
                    <button className="btn__encanta" onClick={clickReaccion}>
                        <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} ${liked ? 'heart-animate' : ''}`}></i> {/* Icono de corazón */}
                    </button>
                </div>

                {/* Autenticación */}
                {isAuthenticated ? (
                    <div className="navbar-nav nav-salir">
                        <button className="btn btn-logout" onClick={() => logout()}>Cerrar Sesión</button> {/* Botón de cerrar sesión */}
                    </div>
                ) : (
                    <div className="navbar-nav nav-iniciar">
                        <button className="btn btn-login" onClick={() => loginWithRedirect()}>Iniciar Sesión</button> {/* Botón de iniciar sesión */}
                    </div>
                )}

                {/* Botón para abrir menú lateral en dispositivos móviles */}
                <button className="navbar-toggler icon__list" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <i className="bi bi-list"></i> {/* Icono de lista */}
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> {/* Botón para cerrar el menú lateral */}
                    </div>


                    <div className="offcanvas-body">
                        <ul className="navbar-nav menu-list" aria-labelledby="dropdownMenuButton">
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
                                </div>
                            ) : (
                                <button className="btn-person-circle" onClick={() => loginWithRedirect()}>
                                    <i className="bi bi-person-circle"></i>
                                </button>
                            )}

                            <li className="nav-item">
                                <Link to="/profile" className={isActive('/profile')}>Perfil y Configuración</Link> {/* Enlace al perfil */}
                            </li>
                            <li className="nav-item">
                                <Link to="/" className={isActive('/')}>Inicio</Link> {/* Enlace a Inicio */}
                            </li>
                            <li className="nav-item">
                                <Link to="/CompraProducto" className={isActive('/CompraProducto')}>Comprar Producto</Link> {/* Enlace a Comprar Producto */}
                            </li>
                            {roles.includes('admin') && ( /* Si el usuario tiene el rol de admin, muestra opciones adicionales */
                                <>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Crud Productos
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-dark">

                                            <li className="nav-item dropdown-item d-block">
                                                <Link to="/AgregarProducto" className={isActive('/AgregarProducto')}>Agregar Producto</Link> {/* Enlace a Agregar Producto */}
                                            </li>
                                            <li className="nav-item dropdown-item">
                                                <Link to="/EliminarProducto" className={isActive('/EliminarProducto')}>Eliminar Producto</Link> {/* Enlace a Eliminar Producto */}
                                            </li>
                                            <li className="nav-item dropdown-item">
                                                <Link to="/ModificarProducto" className={isActive('/ModificarProducto')}>Modificar Producto</Link> {/* Enlace a Modificar Producto */}
                                            </li>
                                            <li className="nav-item dropdown-item">
                                                <Link to="/DetalleVenta" className={isActive('/DetalleVenta')}>Detalle de Venta</Link> {/* Enlace a Detalle de Venta */}
                                            </li>
                                        </ul>
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
