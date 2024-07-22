import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Description = () => {
    const location = useLocation();
    const item = location.state?.item;
    const producto = location.state?.producto;

    if (!item && !producto) {
        return <p>Producto no encontrado</p>;
    }

    const details = item || producto;

    // Determina la ruta de retorno basada en el tipo de dato
    const returnPath = item ? "/CompraProducto" : "/";

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
                </div>
            </div>
        </section>
    );
};

export default Description;
