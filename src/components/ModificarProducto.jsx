import React, { useState, useEffect } from 'react';

// esto es para crear un formulario para modificar los productos
const ProductoForm = ({ productoEditable, setProductoEditable, guardarCambios }) => {
    // esta función se encarga de actualizar el campo del producto
    const ActualizarCampo = (e) => {
        //e.target obtiene el nombre y el valor del campo cambiado
        const { name, value } = e.target;  // esto es para obtener el nombre y el valor del campo cambiado
        // esto es para actualizar el campo del producto

        setProductoEditable({ ...productoEditable, [name]: name === 'precio' ? parseFloat(value) : value });//? parseFloat(value) : value es una condición para convertir el valor del campo 'precio' a número
    };

    return (
        {/* el preventDefault() evita que la página se recargue al enviar el formulario */ },
        {/* el onSubmit() se encarga de manejar el envío del formulario */ },
        {/* el onChange() se encarga de actualizar el campo 'nombre' */ },
        {/* el (e) evita que la página se recargue al enviar el formulario */ },

        <form form onSubmit={(e) => { e.preventDefault(); guardarCambios(); }}>
            <div>
                <label className='label'>Nombre</label>
                <input className='actualizar'
                    type="text"
                    name="nombre"
                    value={productoEditable.nombre}
                    onChange={ActualizarCampo}  // Actualizar el campo 'nombre'
                />
            </div>
            <div>
                <label className='label'>Precio</label>
                <input className='actualizar'
                    type="number"
                    name="precio"
                    min={1}
                    value={productoEditable.precio}
                    onChange={ActualizarCampo}  // Actualizar el campo 'precio'
                />
            </div>
            <div>
                <label className='label'>Descripción</label>
                <input className='actualizar'
                    type="text"
                    name="descripcion"
                    value={productoEditable.descripcion}
                    onChange={ActualizarCampo}  // Actualizar el campo 'descripcion'
                />
            </div>
            <div>
                <label className='label'>Cantidad</label>
                <input className='actualizar'
                    type="number"
                    name="stock"
                    min={1}
                    value={productoEditable.stock}
                    onChange={ActualizarCampo}  // Actualizar el campo 'cantidad'
                />
            </div>
            <div className='botones'>
                <button type="submit" className='Guardar'>Guardar Cambios</button>  {/* Botón para guardar cambios */}
                <button type="button" className='cancelar' onClick={() => setProductoEditable(null)}>Cancelar</button>  {/* Botón para cancelar */}
            </div>
        </form >
    );
};

//estp es para que se muestren los productos en la pagina principal
//prodcto es el nombre de la variable que se le asigna a cada producto
// modificarProducto es la función que se encarga de modificar el producto
// productoEditable es el producto que se está editando
// setProductoEditable es la función que se encarga de establecer el producto editable
// guardarCambios es la función que se encarga de guardar los cambios del producto
const ProductoCard = ({ producto, modificarProducto, productoEditable, setProductoEditable, guardarCambios }) => (
    <div className="col-3 mb-4 listado-Producto">
        <div className="card card-listado">
            <img src={producto.imagen} alt={producto.nombre} className="card-img-top imagen" />
            <div className="card-body">

                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">${producto.precio.toLocaleString()}</p>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">Cantidad: {producto.stock}</p>
                {/* productoEditable && productoEditable.id === producto.id esto compara el 
                id del producto con el id del producto seleccionado si es igual lo selecciona */}
                {productoEditable && productoEditable.id === producto.id && (
                    <ProductoForm
                        productoEditable={productoEditable}
                        setProductoEditable={setProductoEditable}
                        guardarCambios={guardarCambios}

                    />
                )}
            </div>
            {/*si el producto esta siendo modificado se oculta el boton de modificar y si no es esta siendo editado aparece */}
            {!productoEditable && (
                <button className="btn btn-primary" onClick={() => modificarProducto(producto.id)}>Modificar</button>
            )}

        </div>
    </div>
);

// Componente principal
const ModificarProducto = () => {
    const [productos, setProductos] = useState([]);  // Estado para los productos
    //se crea un estado para el producto editable osea que si es null no se puede editar
    const [productoEditable, setProductoEditable] = useState(null);  // Estado para el producto editable

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        if (productosGuardados) setProductos(productosGuardados);  // Establecer productos si hay datos en localStorage
    }, []);

    // Función para seleccionar el producto a modificar
    const modificarProducto = (productoId) => {
        //(p => p.id === productoId) esto compara el id del producto con el id del producto seleccionado si es igual lo selecciona 
        const producto = productos.find(p => p.id === productoId);  // Encontrar el producto por ID
        setProductoEditable(producto);  // Establecer el producto editable
    };

    // Función para guardar los cambios del producto modificado
    const guardarCambios = () => {
        //productos.map(p => p.id === productoEditable.id ? productoEditable : p) esto actualiza el producto modificado
        const productosActualizados = productos.map(p =>
            p.id === productoEditable.id ? productoEditable : p
        );
        setProductos(productosActualizados);  // Actualizar el estado de productos
        localStorage.setItem('productos', JSON.stringify(productosActualizados));  // Guardar en localStorage
        setProductoEditable(null);  // Limpiar el producto editable
    };

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
        <div className="container-home container-home--listado">

            <section className="productos">
                <div className="container-list mt-4">
                    <h1 className="titulo-productos">Listado de Productos Disponibles para Modificar</h1>
                    <div className="row content-listado">
                        {productos.length > 0 ? (  // Verificar si hay productos en la lista
                            productos.map(producto => (
                                <ProductoCard
                                    key={producto.id}
                                    producto={producto}
                                    modificarProducto={modificarProducto}
                                    productoEditable={productoEditable}
                                    setProductoEditable={setProductoEditable}
                                    guardarCambios={guardarCambios}
                                />
                            ))
                        ) : (
                            <p>No hay productos en el localStorage</p>  // Mensaje si no hay productos
                        )}
                    </div>
                </div>
            </section>

            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div>
    );
};

export default ModificarProducto;
