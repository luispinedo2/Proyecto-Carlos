// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', JSON.stringify(total));
    }, [carrito, total]);

    return (
        <CartContext.Provider value={{ carrito, setCarrito, total, setTotal }}>
            {children}
        </CartContext.Provider>
    );
};
