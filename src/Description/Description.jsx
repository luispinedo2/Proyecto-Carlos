// Description.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { agregarProducto } from '../CompraProducto/CompraProducto';

const Description = () => {
    const location = useLocation();
    const item = location.state?.item;
    const producto = location.state?.producto;

    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0);

    if (!item && !producto) {
        return <p>Producto no encontrado</p>;
    }

    const details = item || producto;

    // Función para manejar la compra
    const comprar = () => {
        agregarProducto(details, carrito, setCarrito, total, setTotal);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', JSON.stringify(total));
    };

    // Determina la ruta de retorno basada en el tipo de dato
    const returnPath = item ? "/" : "/";

    return (
        <section>
            <Link to={returnPath} className="back-link">
                <i className="bi bi-arrow-left-circle"></i>
            </Link>
            <div className="description-container">
                <img src={details.imagen} alt={details.nombre} className="description-image" />
                <div className="description-details">
                    <h2>{details.nombre}</h2>
                    <p>{details.descripcion}</p>
                    <p>Precio: ${details.precio}</p>
                    <p>Stock: {details.stock}</p>
                    <p>Categoría: {details.categoria}</p>
                    <button onClick={comprar} className="btn btn-primary">Agregar al carrito</button>
                </div>
            </div>
        </section>
    );
};

export default Description;
