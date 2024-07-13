import React, { useEffect, useRef, useState } from "react";
import '../assets/css/Main.css';

export function EliminarProducto() {

    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        if (productosGuardados) {
            setProductos(productosGuardados);
        }
    }
        , []);

    // Función para eliminar un producto de la lista
    const eliminarProductoLista = (id) => {

        //esto es para confirmar si el usuario desea eliminar el producto
        const confirmar = window.confirm("¿Está seguro de eliminar este producto?");
        //si el usuario cancela la eliminación, no hacer nada
        if (!confirmar) return;
        //esto es para Buscar el producto en la lista de productos
        const productoEnLista = productos.find(item => item.id === id);
        // Si no se encuentra el producto, no hacer nada
        if (!productoEnLista) return;
        // esto es para Crear una nueva lista sin el producto a eliminar
        let nuevaLista = productos.filter(item => item.id !== id);

        //esto es para  Actualizar el estado de productos
        setProductos(nuevaLista);
        //esto es para Actualizar el localStorage
        localStorage.setItem('productos', JSON.stringify(nuevaLista));
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
        <div className=" container-home container-home--listado">
            <section className="productos">
                <div className="container-list mt-4">
                    <h1 className="titulo-productos">Productos Para Eliminar</h1>
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

                                        </div>
                                        <button className="btn btn-danger btn-danger-eliminar " onClick={() => eliminarProductoLista(producto.id)}>Eliminar</button>
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

export default EliminarProducto;