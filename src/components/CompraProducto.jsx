import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import { CarritoItem } from "./CarritoItem"; // Ajusta esta importación según sea necesario
import { Login } from './Login'; // Ajusta esta importación según sea necesario
import { Logout } from './Logout'; // Ajusta esta importación según sea necesario
import { Profile } from './Profile'; // Ajusta esta importación según sea necesario

export function CompraProducto() {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0);
    const [mensaje, setMensaje] = useState("");
    const [fecha, setFecha] = useState(new Date().toLocaleDateString());
    const [compras, setCompras] = useState(JSON.parse(localStorage.getItem('compras')) || []);

    // Recuperar productos de localStorage al montar el componente
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        if (productosGuardados && productosGuardados.length > 0) {
            setProductos(productosGuardados);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("fecha", JSON.stringify(fecha));
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("total", JSON.stringify(total));
        localStorage.setItem("productos", JSON.stringify(productos));
        localStorage.setItem("compras", JSON.stringify(compras));
    }, [carrito, total, fecha, productos, compras]);

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

    const comprar = () => {
        const nuevaCompra = {
            id: uuidv4(),
            fecha,
            productos: carrito,
            total
        };
        setCompras([...compras, nuevaCompra]);
        setMensaje("Compra realizada con éxito");
        setCarrito([]);
        setTotal(0);
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


    // Autenticación
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div>
                <h2>Para realizar una compra, debes iniciar sesión.</h2>
                <Login />
            </div>
        );
    }

    return (
        <div>
            <header>
                <h1>Compra Producto</h1>
                <Profile />
                <Logout />
            </header>
            <div className="row">
                <div className="col-8 productos">
                    <h1 className="subtitulo">Productos Disponibles</h1>
                    <div className="row">
                        {productos.map(item => (
                            <CarritoItem key={item.id} item={item} onBuy={agregarProducto} stock={item.stock} />
                        ))}
                        {productos.length === 0 && <p className="stock">No hay productos disponibles</p>}
                    </div>
                </div>
                <div className="carrito col-4">
                    <h1 className="subtitulo">Carrito de Compras</h1>
                    <div className="contentCarrito">
                        <ul className="list-group">
                            {carrito.map(item => (
                                <li key={item.id} className="list-group-item productosCarrito">
                                    <img src={item.imagen} alt={item.nombre} className="carrito-item-imagen" />
                                    {item.nombre} - ${item.precio.toLocaleString()} x {item.cantidad}
                                    <button className="btn btn-danger" onClick={() => eliminarProducto(item.id)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                        <h3 className="total">Total: ${total.toLocaleString()}</h3>
                        <button className="btn btn-success" onClick={comprar}>
                            Comprar
                        </button>
                        <h3 className="mensaje">{mensaje}</h3>
                    </div>
                </div>
            </div>
            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div>
    );
}

export default CompraProducto;
