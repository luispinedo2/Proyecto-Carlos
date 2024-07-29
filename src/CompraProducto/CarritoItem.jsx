import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export default CarritoItem;


export function CarritoItem({ item, onBuy, stock }) {
    const agregarAlCarrito = () => {
        const cantidad = document.getElementById(`cantidad-${item.id}`).value;
        onBuy(item, parseInt(cantidad));
        // Reseteamos el valor del input
        document.getElementById(`cantidad-${item.id}`).value = 1;
    };

    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate('/description', { state: { item } });
    };

    return (
        <div className="col-md-3 mb-3 content-card">
            <div className="card">
                <img
                    src={item.imagen}
                    className="card-img-top"
                    alt={item.nombre}
                    onClick={handleProductClick}
                />
                <div className="card-body">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="card-text">Precio: ${item.precio.toLocaleString()}</p>
                    <p className="card-text card-description">{item.descripcion}</p>
                </div>
                <p className="card-text card-text__cantidad">Cantidad:</p>
                <input
                    type="number"
                    className="cantidad"
                    id={`cantidad-${item.id}`}
                    min="1"
                    max={item.stock}
                    defaultValue="1"
                    disabled={stock === 0}
                />
                <button
                    className="btn btn-primary__agregar"
                    onClick={agregarAlCarrito}
                    disabled={stock === 0}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
