//continuar con la creacion de la funcion para agregar productos al carrito

import React from 'react';
export default CarritoItem;


export function CarritoItem({ item, onBuy, stock }) {
    const agregarAlCarrito = () => {
        const cantidad = document.getElementById(`cantidad-${item.id}`).value;
        onBuy(item, parseInt(cantidad));
        //reseteamos el valor del input
        document.getElementById(`cantidad-${item.id}`).value = 1;

    };
    return (
        <div className="col-md-3 mb-3 content-card">
            {/*agregar contenido al card*/}
            <div className="card">
                {/*agregar imagen al card*/}
                <img src={item.imagen} className="card-img-top imagen" alt={item.nombre} />
                <div className="card-body">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="card-text">Precio: ${item.precio.toLocaleString()}</p>
                    <p className="card-text card-description">Descripción: {item.descripcion}</p>
                </div>
                <p className="card-text card-text__cantidad">Cantidad:</p>
                <input
                    type="number"
                    className='cantidad'

                    id={`cantidad-${item.id}`}
                    min="1"
                    max={item.stock}
                    defaultValue="1"

                    disabled={stock === 0}
                />
                <button className="btn btn-primary" onClick={agregarAlCarrito}
                    disabled={stock === 0}

                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
