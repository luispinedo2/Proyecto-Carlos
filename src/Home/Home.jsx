
// src/components/Home.js
import React, { useEffect, useState } from "react";
import '../assets/css/Main.css';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from './carrusel';
import { useAuth0 } from '@auth0/auth0-react';
import { CarritoItem } from "../CompraProducto/CarritoItem"; // Ajusta esta importación según sea necesario
import ConfirmDialog from '../CompraProducto/confirm'; // Ajusta esta importación según sea necesario
import NavBar2 from '../Navbar/Navbar2'; // Ajusta esta importación según sea necesario
// Define la función fuera del componente
export function agregarProducto(producto, carrito, setCarrito, total, setTotal) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
        const nuevoCarrito = carrito.map(item =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        setCarrito(nuevoCarrito);
        setTotal(total + producto.precio);
    } else {
        setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        setTotal(total + producto.precio);
    }
}


export function Home() {
    /*guardar los productos en el local storage*/
    const productosinicial = [
        { id: uuidv4(), imagen: 'img/OIP.jpeg', nombre: 'MARIO BROSS', precio: 20000, descripcion: "Clásico juego de plataformas y aventuras.", stock: 120, categoria: 'Plataformas' },
        { id: uuidv4(), imagen: 'img/fortnite.jpg', nombre: 'FORTNITE', precio: 10000, descripcion: "Popular juego de disparos y construcción.", stock: 120, categoria: 'Battle Royale' },
        { id: uuidv4(), imagen: 'img/zelda.jpeg', nombre: 'ZELDA', precio: 10000, descripcion: "Épico juego de aventuras y exploración.", stock: 120, categoria: 'Aventura' },
        { id: uuidv4(), imagen: 'img/freefire.jpeg', nombre: 'FREE FIRE', precio: 5000, descripcion: "Juego de disparos y supervivencia.", stock: 120, categoria: 'Battle Royale' },
        { id: uuidv4(), imagen: 'img/pacman.jpeg', nombre: 'PACMAN', precio: 80000, descripcion: "Clásico juego arcade de laberintos.", stock: 120, categoria: 'Arcade' },
        { id: uuidv4(), imagen: 'img/metalslug.jpeg', nombre: 'METAL SLUG', precio: 90000, descripcion: "Intenso juego de disparos en 2D.", stock: 120, categoria: 'Acción' },
        { id: uuidv4(), imagen: 'img/duck.jpeg', nombre: 'DUCK HUNT', precio: 11000, descripcion: "Juego de caza con pistola de luz.", stock: 120, categoria: 'Tiro' },
        { id: uuidv4(), imagen: 'img/donkeykong.jpeg', nombre: 'DONKEY KONG', precio: 6000, descripcion: "Clásico juego de plataformas y aventuras.", stock: 120, categoria: 'Plataformas' },
        { id: uuidv4(), imagen: 'img/contra.jpeg', nombre: 'CONTRA', precio: 30000, descripcion: "Acción y disparos en un clásico 2D.", stock: 120, categoria: 'Acción' },
        { id: uuidv4(), imagen: 'img/crash.png', nombre: 'CRASH', precio: 40000, descripcion: "Juego de plataformas con un divertido personaje.", stock: 120, categoria: 'Plataformas' },
        { id: uuidv4(), imagen: 'img/call.jpeg', nombre: 'CALL OF DUTY', precio: 70000, descripcion: "Famoso juego de disparos en primera persona.", stock: 120, categoria: 'FPS' },
        { id: uuidv4(), imagen: 'img/halo.jpeg', nombre: 'HALO', precio: 80000, descripcion: "Juego de disparos futurista y épico.", stock: 120, categoria: 'FPS' },
        { id: uuidv4(), imagen: 'img/GEARS.jpeg', nombre: 'GEARS OF WAR', precio: 90000, descripcion: "Intenso juego de disparos en tercera persona.", stock: 120, categoria: 'TPS' },
        { id: uuidv4(), imagen: 'img/ASSASSINS.jpeg', nombre: 'ASSASSINS CREED', precio: 10000, descripcion: "Juego de acción y sigilo histórico.", stock: 120, categoria: 'Acción' },
        { id: uuidv4(), imagen: 'img/GOD.jpeg', nombre: 'GOD OF WAR', precio: 20000, descripcion: "Épico juego de acción y mitología.", stock: 120, categoria: 'Acción' },
        { id: uuidv4(), imagen: 'img/SPIDERMAN.jpeg', nombre: 'SPIDERMAN', precio: 30000, descripcion: "Aventura de superhéroes en Nueva York.", stock: 120, categoria: 'Acción' },
        { id: uuidv4(), imagen: 'img/THE-LAST.jpeg', nombre: 'THE LAST OF US', precio: 40000, descripcion: "Juego de supervivencia y narrativa emocional.", stock: 120, categoria: 'Supervivencia' },
        { id: uuidv4(), imagen: 'img/UNCHARTED.jpeg', nombre: 'UNCHARTED', precio: 50000, descripcion: "Aventuras y tesoros en acción trepidante.", stock: 120, categoria: 'Aventura' },
        { id: uuidv4(), imagen: 'img/RESIDENT.jpeg', nombre: 'RESIDENT EVIL', precio: 60000, descripcion: "Juego de terror y supervivencia.", stock: 120, categoria: 'Terror' },
        { id: uuidv4(), imagen: 'img/FIFA23.jpeg', nombre: 'FIFA', precio: 70000, descripcion: "Popular juego de fútbol y deportes.", stock: 120, categoria: 'Deportes' },
        { id: uuidv4(), imagen: 'img/PES21.jpeg', nombre: 'PES', precio: 80000, descripcion: "Simulación de fútbol realista.", stock: 120, categoria: 'Deportes' },
        { id: uuidv4(), imagen: 'img/NBA.jpeg', nombre: 'NBA', precio: 90000, descripcion: "Juego de baloncesto profesional.", stock: 120, categoria: 'Deportes' },
        { id: uuidv4(), imagen: 'img/MLB.jpeg', nombre: 'MLB', precio: 10000, descripcion: "Simulación de béisbol profesional.", stock: 120, categoria: 'Deportes' },
        { id: uuidv4(), imagen: 'img/NFL.jpeg', nombre: 'NFL', precio: 20000, descripcion: "Juego de fútbol americano.", stock: 120, categoria: 'Deportes' },
        { id: uuidv4(), imagen: 'img/UFC.jpeg', nombre: 'UFC', precio: 30000, descripcion: "Simulación de artes marciales mixtas.", stock: 120, categoria: 'Deportes' },
        { id: uuidv4(), imagen: 'img/MORTAL.jpeg', nombre: 'MORTAL KOMBAT', precio: 40000, descripcion: "Clásico juego de lucha y combate.", stock: 120, categoria: 'Lucha' },
        { id: uuidv4(), imagen: 'img/STREET.jpeg', nombre: 'STREET FIGHTER', precio: 50000, descripcion: "Icónico juego de lucha callejera.", stock: 120, categoria: 'Lucha' },
    ];
    const [productos, setProductos] = useState(productosinicial);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0);
    const [mensaje, setMensaje] = useState("");
    const [compras, setCompras] = useState(JSON.parse(localStorage.getItem('compras')) || []);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [showScroll, setShowScroll] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(productosinicial);
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    // Recuperar productos de localStorage al montar el componente
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        if (productosGuardados) {
            setProductos(productosGuardados);
        }
    }
        , []);

    // Guardar productos en localStorage al actualizar el estado
    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("total", JSON.stringify(total));
        localStorage.setItem("compras", JSON.stringify(compras));
    }, [carrito, total, compras]);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            setFilteredProducts(productos.filter(producto => producto.categoria === category));
        } else {
            setFilteredProducts(productos);
        }
    }, [location.search, productos]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const eliminarProducto = (id) => {
        const productoEnCarrito = carrito.find(item => item.id === id);
        if (!productoEnCarrito) return;
        let nuevoCarrito;
        let nuevoTotal;
        if (productoEnCarrito.cantidad > 1) {
            nuevoCarrito = carrito.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            );
            nuevoTotal = total - productoEnCarrito.precio;
        } else {
            nuevoCarrito = carrito.filter(item => item.id !== id);
            nuevoTotal = total - productoEnCarrito.precio;
        }
        setCarrito(nuevoCarrito);
        setTotal(nuevoTotal);
    };
    const comprar = () => {
        if (!isAuthenticated) {
            setMensaje("Para realizar una compra, debes iniciar sesión.");
            loginWithRedirect();
            return;
        }
        if (carrito.length === 0) {
            setMensaje("El carrito está vacío");
            return;
        }
        setMostrarConfirmacion(true); // Mostrar el cuadro de diálogo de confirmación
    };
    const confirmarCompra = () => {
        const nuevosProductos = productos.map(producto => {
            const productoEnCarrito = carrito.find(item => item.id === producto.id);
            if (productoEnCarrito) {
                return {
                    ...producto,
                    stock: producto.stock - productoEnCarrito.cantidad
                };
            }
            return producto;
        });
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
        guardarCompraEnLocalStorage();
        setMensaje("Compra realizada con éxito. Su compra es de " + total.toLocaleString() + ". Gracias por su compra.");
        setCarrito([]);
        setTotal(0);
        setMostrarConfirmacion(false); // Ocultar el cuadro de diálogo de confirmación
    };
    const cancelarCompra = () => {
        setMostrarConfirmacion(false); // Ocultar el cuadro de diálogo de confirmación
    };
    const guardarCompraEnLocalStorage = () => {
        const nuevaCompra = {
            id: uuidv4(),
            fecha: new Date().toLocaleString(),
            total: total,
            productos: carrito
        };
        const nuevasCompras = [...compras, nuevaCompra];
        setCompras(nuevasCompras);
        localStorage.setItem('compras', JSON.stringify(nuevasCompras));
    };
    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };




    return (
        <div className="container__principal" >
            <nav className="navbar-dark content_principal">
                <NavBar2 carrito={carrito} setCarrito={setCarrito} />
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <h1 className="subtitulo__carrito">Carrito de Compras</h1>
                    <div className="carrito">
                        <div className="contentCarrito">
                            <ul className="list-group">
                                {carrito.map(item => (
                                    <li key={item.id} className="list-group-item productosCarrito">
                                        <img src={item.imagen} alt={item.nombre} className="carrito-item-imagen" />
                                        {item.nombre} <br />Cantidad: {item.cantidad} <br /> Precio : ${item.precio.toLocaleString()}
                                        <button className="btn btn-danger__comprar" onClick={() => eliminarProducto(item.id)}>
                                            {item.cantidad > 1 ? "Restar" : "Eliminar"}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {mensaje && (
                            <div className="mensaje" role="alert">
                                {mensaje}
                            </div>
                        )}
                        <h3 className="total">Total: ${total.toLocaleString()}</h3>
                        <button className="btn btn-success__comprar" onClick={comprar}>
                            Comprar
                        </button>
                    </div>
                    {mostrarConfirmacion && (
                        <ConfirmDialog
                            mensaje="¿Está seguro de que desea confirmar la compra?"
                            onConfirm={confirmarCompra}
                            onCancel={cancelarCompra}
                        />
                    )}
                </div>

                <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                    <i className="bi bi-arrow-up-short"></i>
                </div>
            </nav >
            <Carousel />
            <div className="productos-card">
                <h1 className="titulo_card__principal">Productos Disponibles</h1>
                <div className="row">
                    {filteredProducts.map(item => (
                        <CarritoItem key={item.id} item={item} onBuy={(producto) => agregarProducto(producto, carrito, setCarrito, total, setTotal)} stock={item.stock} />
                    ))}
                    {productos.length === 0 && <p className="mensaje_stock">No hay productos disponibles</p>}

                </div>
            </div>
        </div >

    );
}
export default Home;

