import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export function NavBar({ carrito = [], setCarrito }) {
    const [contador, setContador] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (carrito && carrito.length > 0) {
            const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            setContador(totalProductos);
        } else {
            setContador(0);
        }
    }, [carrito]);

    return (
        <div className="navbar-carrito">
            <div></div>
            <button className="carrito_compras-btn" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                aria-label="Toggle navigation"
                /*si estamos en la ruta de description, colarle disabled*/
                disabled={location.pathname === '/description' ? true : false}
            >
                <i className="bi bi-cart"></i>
                {contador > 0 && <span className="contador-carrito">{contador}</span>}
            </button>
        </div>
    );
}

export default NavBar;