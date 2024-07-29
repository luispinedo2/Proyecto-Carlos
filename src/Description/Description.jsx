import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { agregarProducto } from '../Home/Home';
import NavBar2 from '../Navbar/Navbar2'; // Ajusta esta importación según sea necesario

const Description = () => {
    const location = useLocation();
    const item = location.state?.item;
    const producto = location.state?.producto;

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);

    // Cargar carrito y total desde localStorage al montar el componente
    useEffect(() => {
        const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalLocal = JSON.parse(localStorage.getItem('total')) || 0;
        setCarrito(carritoLocal);
        setTotal(totalLocal);
    }, []);

    if (!item && !producto) {
        return <p>Producto no encontrado</p>;
    }

    const details = item || producto;

    // Función para manejar la compra
    const comprar = () => {
        agregarProducto(details, carrito, setCarrito, total, setTotal);
        // Debemos actualizar el carrito y el total antes de guardarlos en localStorage
        const nuevoCarrito = carrito.find(item => item.id === details.id)
            ? carrito.map(item => item.id === details.id ? { ...item, cantidad: item.cantidad + 1 } : item)
            : [...carrito, { ...details, cantidad: 1 }];
        const nuevoTotal = total + details.precio;
        setCarrito(nuevoCarrito);
        setTotal(nuevoTotal);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        localStorage.setItem('total', JSON.stringify(nuevoTotal));
    };

    // Determina la ruta de retorno basada en el tipo de dato
    const returnPath = item ? "/" : "/";

    return (
        <section className='section_description'>
            <Link to={returnPath} className="back-link">
                <i className="bi bi-arrow-left-circle"></i>
            </Link>
            <NavBar2 carrito={carrito} setCarrito={setCarrito} />
            <div className="description-container">
                <img src={details.imagen} alt={details.nombre} className="description-image" />
                <div className="description-details">
                    <h2>{details.nombre}</h2>
                    <p>{details.descripcion}</p>
                    <p>Precio: ${details.precio}</p>
                    <p>Stock: {details.stock}</p>
                    <p>Categoría: {details.categoria}</p>
                    <button onClick={comprar} className="btn btn-primary__agregar">Agregar al carrito</button>
                </div>
            </div>
        </section>
    );
};

export default Description;
