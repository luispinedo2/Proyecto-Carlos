import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function AgregarNuevoProducto() {
    const [productos, setProductos] = useState([]);
    const [imagen, setImagen] = useState(null);

    const nombreProducto = useRef(null);
    const precioProducto = useRef(null);
    const descripcionProducto = useRef(null);
    const categoriaProducto = useRef(null);
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
        const categoria = categoriaProducto.current.value;
        const stock = stockProducto.current.value;

        if (nombre === "" || precio === "" || descripcion === "" || categoria === "" || stock === "" || !imagen) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const producto = {
            id: uuidv4(),
            nombre,
            precio: Number(precio),
            descripcion,
            categoria,
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
        categoriaProducto.current.value = "";
        stockProducto.current.value = "";
        imagenProducto.current.value = null;
        setImagen(null);
    };

    return (
        <div className='container_agregar_producto'>
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

            <div className="content-input">
                <form action="#">
                    <input type="text" className="input_agregar_producto" ref={nombreProducto} placeholder="Ingrese el nombre del producto" />
                    <input type="number" className="input_agregar_producto" ref={precioProducto} min={1} placeholder="Ingrese el precio" />
                    <input type="text" className="input_agregar_producto" ref={descripcionProducto} placeholder="Ingrese la descripción" />
                    <input type="text" className="input_agregar_producto" ref={categoriaProducto} placeholder="Ingrese la categoría" />
                    <input type="number" className="input_agregar_producto" ref={stockProducto} min={1} placeholder="Ingrese la cantidad" />
                    <input type="file" className="input_agregar_producto form-control" ref={imagenProducto} onChange={guardarImagen} />
                    <button type="button" className="btn-agregar" onClick={agregarProductoNuevo}>
                        Agregar Producto
                    </button>
                </form>
            </div>

            <div className="scroll-up-btn">
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div>
    );
}
export default AgregarNuevoProducto;
