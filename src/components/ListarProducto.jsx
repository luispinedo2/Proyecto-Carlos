import React, { useEffect, useRef, useState } from "react";
import '../assets/css/Main.css';
import { Link } from 'react-router-dom';

export function ListarProducto() {
    //esto es para guardar los productos
    const [productos, setProductos] = useState([]);

    // Recuperar los productos de localStorage cada vez que inicie la aplicación
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        if (productosGuardados) {
            setProductos(productosGuardados);
        }
    }
        , []);


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
        <div className=" container-home container-home--listado">
            <section className="productos">
                {/*mostrar los productos que se encuentran en el local storage*/}
                <div className="container-list mt-4">
                    <h1 className="titulo-productos">Listado de Productos Disponibles</h1>
                    <p className="text-compra">Si desea comprar ir al siguiente enlace
                        <i className="bi bi-arrow-down"></i>
                    </p>

                    <Link to="/CompraProducto" className="link-compra">Comprar Productos</Link>
                    <div className="row content-listado ">
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <div className="col-3 mb-4 listado-Producto" key={producto.id}>
                                    <div className="card card-listado">
                                        <img src={producto.imagen} alt={producto.nombre} className="card-img-top imagen" />
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">${producto.precio.toLocaleString()}</p>
                                            <p className="card-text">{producto.descripcion}</p>
                                            <p className="card-text">Cantidad de Stock: {producto.stock}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos en el localStorage</p>
                        )}
                    </div>
                </div>

            </section>

            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>

        </div >

    );



}

export default ListarProducto;