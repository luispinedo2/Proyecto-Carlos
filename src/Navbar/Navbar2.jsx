import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Description from '../Description/Description';

export function NavBar2({ carrito = [], setCarrito }) { // Inicializa carrito como un arreglo vacío por defecto
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const [searchTerm, setSearchTerm] = useState('');
    const [contador, setContador] = useState(0);

    useEffect(() => {
        if (carrito && carrito.length > 0) {
            const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            setContador(totalProductos);
        } else {
            setContador(0);
        }
    }, [carrito]);

    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    let roles = ['default'];
    if (isAuthenticated) {
        roles = user['https://myroles.com/roles'] || [];
    }

    const [liked, setLiked] = useState(false);

    const clickReaccion = () => {
        setLiked(!liked);
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
                    <i className="bi bi-controller"></i>
                </Link>
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
                <form className="container-form" onSubmit={BuscarProducto}>
                    <div className='content-form'>
                        <input className="input-search" type="search" placeholder="Buscar productos" aria-label="Search"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="btn-search" type="submit">
                            <i className="bi bi-search icon-search"></i>
                        </button>
                    </div>
                </form>
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
                <div className="container-reaccion">
                    <button className="btn__encanta" onClick={clickReaccion}>
                        <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} ${liked ? 'heart-animate' : ''}`}></i>
                    </button>
                </div>
                {isAuthenticated ? (
                    <div className="nav-cerrarsesion">
                        <button className="btn btn-logout" onClick={() => logout()}>Cerrar Sesión</button>
                    </div>
                ) : (
                    <div className="nav-iniciarsesion">
                        <button className="btn btn-login" onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
                    </div>
                )}
                <div className="navbar-carrito">
                    <div></div>
                    <button className="carrito_compras-btn" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                        aria-label="Toggle navigation"
                        /*si estamos en la ruta de description, colarle disabled*/
                        disabled={location.pathname === '/description' ? true : false}
                    >
                        <i className="bi bi-cart"></i>
                        {contador > 0 && <span className="contador-carrito">{contador}</span>}
                    </button>
                </div>
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
                                />
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
                                <Link to="/about" className={isActive('/about')}>Sobre nosotros</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Politicas" className={isActive('/Politicas')}>Políticas de ventas y devolución</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container-redes">
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="redes__link link-facebook">
                            <i className="bi bi-facebook redes__icon"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="redes__link link-instagram">
                            <i className="bi bi-instagram redes__icon"></i>
                        </a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="redes__link link-twitter">
                            <i className="bi bi-twitter redes__icon"></i>
                        </a>
                        <a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer" className="redes__link link-whatsapp">
                            <i className="bi bi-whatsapp redes__icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar2;
