// src/components/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BuscarProducto = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');

        const productos = JSON.parse(localStorage.getItem('productos')) || [];

        if (query) {
            const filteredResults = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults(productos);
        }
    }, [location.search]);

    const handleProductClick = (producto) => {
        navigate('/description', { state: { producto } });

    };

    return (
        <div className="container mt-4">
            <h1>Resultados de búsqueda</h1>
            <div className="row">
                {results.length > 0 ? (
                    results.map(producto => (
                        <div key={producto.id} className="col-md-3 mb-3" onClick={() => handleProductClick(producto)}>
                            <div className="card">
                                <img src={producto.imagen} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombre}</h5>
                                    <p className="card-text">Precio: ${producto.precio}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron resultados para tu búsqueda.</p>
                )}
            </div>
        </div>
    );
};

export default BuscarProducto;
