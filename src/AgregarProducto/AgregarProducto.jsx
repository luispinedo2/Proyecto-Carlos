import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function AgregarNuevoProducto() {
    const [productos, setProductos] = useState([]);
    const [imagen, setImagen] = useState(null);

    const nombreProducto = useRef(null);
    const precioProducto = useRef(null);
    const descripcionProducto = useRef(null);
    const stockProducto = useRef(null);
    const imagenProducto = useRef(null);

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
        setProductos(productosGuardados);
    }, []);

    const guardarImagen = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagen(reader.result);
        };
    };

    const agregarProductoNuevo = () => {
        const nombre = nombreProducto.current.value;
        const precio = precioProducto.current.value;
        const descripcion = descripcionProducto.current.value;
        const stock = stockProducto.current.value;

        if (nombre === "" || precio === "" || descripcion === "" || stock === "" || !imagen) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const producto = {
            id: uuidv4(),
            nombre,
            precio: Number(precio),
            descripcion,
            stock: Number(stock),
            imagen
        };

        const productoExistente = productos.find(p => p.nombre === nombre);
        if (productoExistente) {
            alert("Ya existe un producto con el mismo nombre");
            return;
        }

        const nuevosProductos = [...productos, producto];
        localStorage.setItem("productos", JSON.stringify(nuevosProductos));
        setProductos(nuevosProductos);

        nombreProducto.current.value = "";
        precioProducto.current.value = "";
        descripcionProducto.current.value = "";
        stockProducto.current.value = "";
        imagenProducto.current.value = null;
        setImagen(null);
    };

    return (
        <div>
            <h2 className='titulo-agregar'>Agregar Nuevo Producto</h2>
            <div className="content-input mb-3">
                <form action="#">
                    <input type="text" className="form-control" ref={nombreProducto} placeholder="Ingrese el nombre del producto" />
                    <input type="number" className="form-control" ref={precioProducto} min={1} placeholder="Ingrese el precio" />
                    <input type="text" className="form-control" ref={descripcionProducto} placeholder="Ingrese la descripción" />
                    <input type="number" className="form-control" ref={stockProducto} min={1} placeholder="Ingrese la cantidad" />
                    <input type="file" className="form-control" ref={imagenProducto} onChange={guardarImagen} />
                    <button type="button" className="btn-agregar btn-success" onClick={agregarProductoNuevo}>
                        <i className="bi bi-plus-circle-fill mas__agregar"></i>
                        Agregar Producto
                    </button>
                </form>
            </div>
            <div className="productos-agregados">
                <h3 className='titulo-agregados'>Productos Agregados</h3>
                <ul>
                    {productos.map(producto => (
                        <li key={producto.id} className='list-agregado'>
                            <strong className='nombre-agregado'>{producto.nombre}</strong> ${producto.precio.toLocaleString()} - Stock: {producto.stock}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="scroll-up-btn">
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div>
    );
}
export default AgregarNuevoProducto;
