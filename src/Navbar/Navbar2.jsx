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
        <nav className="navbar menu-principal">
            <div className="container-fluid">
                <Link to="/" className="title-nav_principal">

                    GameVerse
                    <i className="bi bi-controller"></i></Link>


                <div className="container-category">
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
                <form className="container-form" onSubmit={BuscarProducto}>
                    <div className='content-form'>
                        <input className="input-search" type="search" placeholder="Buscar productos" aria-label="Search"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> {/* Campo de búsqueda */}
                        <button className="btn-search" type="submit">
                            <i className="bi bi-search icon-search"></i> {/* Icono de búsqueda */}
                        </button>
                    </div>
                </form>

                {/* Mis compras */}
                {isAuthenticated ? (

                    <Link to="/MisCompras" className="title-nav__compras">
                        Mis Compras
                    </Link>
                ) : (
                    <div className='container-compras'>
                        <Link to="/about" className="title-nav__compras">
                            sobre nosotros
                        </Link>
                    </div>
                )}

                {/* Botón "me encanta" */}
                <div className="container-reaccion">
                    <button className="btn__encanta" onClick={clickReaccion}>
                        <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} ${liked ? 'heart-animate' : ''}`}></i> {/* Icono de corazón */}
                    </button>
                </div>

                {/* Autenticación */}
                {isAuthenticated ? (
                    <div className="nav-cerrarsesion">
                        <button className="btn btn-logout" onClick={() => logout()}>Cerrar Sesión</button> {/* Botón de cerrar sesión */}
                    </div>
                ) : (
                    <div className="nav-iniciarsesion">
                        <button className="btn btn-login" onClick={() => loginWithRedirect()}>Iniciar Sesión</button> {/* Botón de iniciar sesión */}
                    </div>
                )}
                <button className="navbar-toggler bg-body-tertiary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
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

                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link to="/profile" className={isActive('/profile')}>Perfil y Configuración</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Crud Productos
                                </a>
                                {roles.includes('admin') && (
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <Link to="/AgregarProducto" className={isActive('/AgregarProducto')}>Agregar Producto</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/EliminarProducto" className={isActive('/EliminarProducto')}>Eliminar Producto</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/ModificarProducto" className={isActive('/ModificarProducto')}>Modificar Producto</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/DetalleVenta" className={isActive('/DetalleVenta')}>Detalle de Venta</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
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
        </nav>

    );
}

export default NavBar2; // Exporta el componente NavBar2
