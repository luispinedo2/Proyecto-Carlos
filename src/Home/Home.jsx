
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
   
    const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('productos')) || []);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0);
    const [mensaje, setMensaje] = useState("");
    const [compras, setCompras] = useState(JSON.parse(localStorage.getItem('compras')) || []);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [showScroll, setShowScroll] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const category = params.get('category');


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
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
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
                                        <div className="item-productos">
                                            {item.nombre} <br />Cantidad: {item.cantidad} <br /> Precio : ${item.precio.toLocaleString()}
                                        </div>
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
            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div >

    );
}
export default Home;

