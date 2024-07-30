
import React, { useEffect, useState } from "react";
import Navbar2 from "../Navbar/Navbar2";

export function DetalleVenta() {
    // Estado para almacenar las ventas
    const [ventas, setVentas] = useState([]);
    //esto es para guardar la venta seleccionada
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
    //esto es para guardar el mensaje de anulación
    const [mensaje, setMensaje] = useState("");
    // Recuperar las ventas de localStorage cuando el componente se monte
    useEffect(() => {
        const ventasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
        setVentas(ventasGuardadas);
    }, []);
    // Función para seleccionar una venta y mostrar sus detalles
    const seleccionarVenta = (venta) => {
        //se muestra la venta seleccionada
        setVentaSeleccionada(venta);
    };

    // Función para anular una venta
    const anularVenta = (id) => {
        //se filtra la venta seleccionada el filter devuelve un nuevo array con las ventas que no sean la seleccionada
        const nuevasVentas = ventas.filter(venta => venta.id !== id);
        setVentas(nuevasVentas);
        //se guarda en localStorage el nuevo array de ventas
        localStorage.setItem('compras', JSON.stringify(nuevasVentas));
        //se muestra el mensaje de anulación
        setVentaSeleccionada(null);
        setMensaje("Venta anulada con éxito.");
        //devolver la cantidad al stock del producto anulado
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        //se busca la venta anulada
        const ventaAnulada = ventas.find(venta => venta.id === id);
        //se recorre cada producto de la venta anulada
        //el forEach no devuelve un nuevo array, por lo que se debe recorrer el array de productos y modificarlo
        ventaAnulada.productos.forEach(producto => {
            //se busca el producto en el array de productos
            const productoStock = productos.find(p => p.id === producto.id);
            //se le suma la cantidad de la venta al stock del producto
            productoStock.stock += producto.cantidad;
        });
        //se guarda en localStorage el nuevo array de productos
        localStorage.setItem('productos', JSON.stringify(productos));
        //ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            setMensaje("");
        }, 5000);
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
        <div className="content-ventas">
            <Navbar2 />
            {/*<NavBar2 carrito={carrito} setCarrito={setCarrito} />*/}
            <div className="cabecera_detalle">
                <h1 className="titulo-ventas">Ventas Realizadas</h1>
                <h2 className="titulo-detalle">Detalle de la Venta</h2>
            </div>
            <div className="container-detalle">
                <div className="codigo-ventas">
                    <ul className="codigo-menu">
                        {ventas.map(venta => (
                            <li key={venta.id} className="ventasItem">
                                código de venta: {venta.id} <br />
                                Fecha de la venta: {venta.fecha.toLocaleString()}
                                <button className="btn btn-ver_detalle" onClick={() => seleccionarVenta(venta)}>Ver Detalle</button>
                            </li>
                        ))}
                        {ventas.length === 0 && <p className="registro-ventas">No hay ventas registradas</p>}
                    </ul>
                </div>

                <div className="detalle-venta">
                    {/*las && se utilizan para mostrar el contenido si la condición es verdadera*/}
                    {ventaSeleccionada && (
                        <>

                            <div className="menu-detalle">
                                {ventaSeleccionada.productos.map((producto, index) => (

                                    <div key={index} className="detalleItem">
                                        <img src={producto.imagen} alt={producto.nombre} className="carrito-item-imagen" />
                                        <strong className="nombre_producto-detalle">{producto.nombre}</strong>
                                        <span className="precio_producto-detalle">Precio: ${producto.precio.toLocaleString()}</span>
                                        <span className="cantidad_producto-detalle">Cantidad: {producto.cantidad}</span>

                                    </div>
                                ))}
                                <div className="datos__venta">
                                    <h3 className="Total-detalle">Total: ${ventaSeleccionada.total.toLocaleString()}</h3>
                                    <h4 className="Fecha-detalle">Fecha: {ventaSeleccionada.fecha.toLocaleString()}</h4>
                                </div>
                                <button className="btn btn-danger-detalle" onClick={() => anularVenta(ventaSeleccionada.id)}>Anular Venta</button>

                            </div>

                        </>
                    )}
                    {/*mostrar mensaje de anulación**/}
                    {mensaje && <h3 className="mensajeAnular">{mensaje}</h3>}
                </div>
            </div>

            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div>
    );
}
export default DetalleVenta;
