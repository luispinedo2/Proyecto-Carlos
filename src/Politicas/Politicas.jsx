import React, { useState, useEffect } from 'react';
import '../assets/css/Main.css';

export function Politicas() {
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
        <div className="container-about">
            <header className="header-about">
                <h1 className="titulo-header">Políticas de Ventas y Devoluciones de GameVerse</h1>
            </header>
            <article className="article">
                <h2 className="titulo-article">1. Políticas de Ventas</h2>
                <span className="subtitle-about">1.1 Disponibilidad de Productos</span>
                <p className="text-article">
                    Los productos disponibles en GameVerse incluyen juegos físicos, juegos digitales, consolas y accesorios.
                    Todos los productos están sujetos a disponibilidad y pueden ser retirados de la venta sin previo aviso.
                </p>
                <span className="subtitle-about">1.2 Precios y Promociones</span>
                <p className="text-article">
                    Todos los precios están en moneda local e incluyen impuestos.
                    Las promociones y descuentos son válidos únicamente durante el período especificado y no pueden combinarse con otras ofertas.
                    GameVerse se reserva el derecho de modificar precios sin previo aviso, pero los cambios no afectarán las órdenes ya confirmadas.
                </p>
                <span className="subtitle-about">1.3 Métodos de Pago</span>
                <p className="text-article">
                    Aceptamos los siguientes métodos de pago:
                </p>
                <ul className="lista-politica">
                    <li>Tarjeta de Crédito</li>
                    <li>Tarjeta de Débito</li>
                    <li>Transferencia Bancaria</li>
                    <li>PayPal</li>
                </ul>
                <span className="subtitle-about">1.4 Confirmación de Pedido</span>
                <p className="text-article">
                    Una vez realizado el pedido, el cliente recibirá un correo electrónico de confirmación con los detalles de la compra.
                    Si no recibe el correo en un plazo de 24 horas, debe ponerse en contacto con nuestro servicio de atención al cliente.
                </p>
                <span className="subtitle-about">1.5 Envío y Entrega</span>
                <p className="text-article">
                    Los productos adquiridos en GameVerse serán enviados a la dirección proporcionada por el cliente.
                    El tiempo de entrega varía según la ubicación y el método de envío seleccionado.
                    GameVerse no se hace responsable de los retrasos causados por terceros.
                </p>
                <ul className="lista-politica">
                    <li>Envío Estándar: 3-5 días hábiles</li>
                    <li>Envío Express: 1-2 días hábiles</li>
                    <li>Entrega digital (instantánea para juegos digitales)</li>
                </ul>
            </article>
            <article className="article">
                <h2 className="titulo-article">2. Políticas de Devoluciones</h2>
                <span className="subtitle-about">2.1 Productos Defectuosos</span>
                <p className="text-article">
                    Si un producto llega defectuoso o dañado, el cliente debe notificarnos dentro de los 7 días posteriores a la recepción del producto.
                    GameVerse cubrirá los costos de envío de la devolución y ofrecerá la opción de un reembolso completo o un reemplazo.
                </p>
                <span className="subtitle-about">2.2 Devoluciones de Productos Físicos</span>
                <p className="text-article">
                    Aceptamos devoluciones de productos físicos dentro de los 30 días posteriores a la fecha de compra,
                    siempre que el producto esté en su estado original y sin abrir.
                    Los productos deben ser devueltos con el recibo de compra original.
                    Los gastos de envío no son reembolsables y el cliente es responsable de los costos de envío de la devolución.
                </p>
                <span className="subtitle-about">2.3 Devoluciones de Juegos Digitales</span>
                <p className="text-article">
                    No aceptamos devoluciones de juegos digitales.
                    Sin embargo, si hay un problema técnico o el juego no es como se describe,
                    el cliente puede ponerse en contacto con nuestro servicio de atención al cliente para evaluar posibles soluciones,
                    que pueden incluir un reembolso o un cambio por otro título.
                </p>
            </article>

            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div>
    );
}

export default Politicas;
