import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import { CarritoItem } from "./CarritoItem"; // Ajusta esta importación según sea necesario

import ConfirmDialog from './confirm'; // Ajusta esta importación según sea necesario

export function CompraProducto() {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0);
    const [mensaje, setMensaje] = useState("");
    const [compras, setCompras] = useState(JSON.parse(localStorage.getItem('compras')) || []);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Recuperar productos de localStorage al montar el componente
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        if (productosGuardados && productosGuardados.length > 0) {
            setProductos(productosGuardados);
        }
    }, []);

    useEffect(() => {

        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("total", JSON.stringify(total));
        localStorage.setItem("compras", JSON.stringify(compras));
    }, [carrito, total, compras]);

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

    const agregarProducto = (producto) => {
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
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setMensaje("");
        }, 8000);
        return () => clearTimeout(timer);
    }, [mensaje]);

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

    const [showScroll, setShowScroll] = useState(false);

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

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    return (
        <div className="containerProductos" >
            <div className="">
                <nav className="navbar-dark ">
                    <div className="container-fluid">
                        <div className="navbar-carrito">
                            <div></div>
                            {/* 
                            <Link to="/Ubicacion" className="title-nav_lateral-ubicacion">
                                <i className="bi bi-geo-alt">
                                </i>
                                Ingresa tu ubicación
                            </Link>
                            */}
                            <button className="carrito_compras-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                                <i className="bi bi-cart"></i>
                            </button>
                        </div>
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

                                {/*if mensaje de confirmacion es true, mostrar un icono de  wraning*/}
                                {mensaje && (
                                    <div className="mensaje" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill"></i>
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
                    </div>
                    <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                        <i className="bi bi-arrow-up-short"></i>
                    </div>
                </nav>

                <div className="productos-card">
                    <h1 className="subtitulo">Productos Disponibles</h1>
                    <div className="row">
                        {productos.map(item => (

                            <CarritoItem key={item.id} item={item} onBuy={agregarProducto} stock={item.stock} />
                        ))}
                        {productos.length === 0 && <p className="stock">No hay productos disponibles</p>}
                    </div>
                </div>
            </div>
        </div>
    );



}

export default CompraProducto;
