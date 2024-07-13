import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { CarritoItem } from "./CarritoItem";

export function CompraProducto() {
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

    const agregarProducto = (producto, cantidad) => {
        if (cantidad <= 0) {
            setMensaje("La cantidad debe ser mayor a 0");
        } else if (producto.stock < cantidad) {
            setMensaje("No hay suficiente stock del producto");
        } else {

            //agregar la imagen del producto al carrito

            const productoEnCarrito = carrito.find(item => item.id === producto.id);
            if (productoEnCarrito) {
                const nuevoCarrito = carrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
                );
                setCarrito(nuevoCarrito);
            } else {
                const nuevoCarrito = [...carrito, { ...producto, cantidad }];
                setCarrito(nuevoCarrito);
            }
            setTotal(total + producto.precio * cantidad);
        }

        setTimeout(() => {
            setMensaje("");
        }, 5000);
    };

    const comprar = () => {
        if (carrito.length === 0) {
            setMensaje("El carrito está vacío");
            return;
        }

        const confirmacion = window.confirm("¿Está seguro de que desea confirmar la compra?");
        if (!confirmacion) {
            return;
        }

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

        setTimeout(() => {
            setMensaje("");
        }, 5000);
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
        <div className="content-productos">
            <div>
                <header className="card-title titulo">Generar compra</header>
            </div>

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
