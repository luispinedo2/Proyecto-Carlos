import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar2 from './Navbar/Navbar2';
import NavBar from './Navbar/NavBar';
import Home from './Home/Home';
import About from './About/About';
import AgregarProducto from './AgregarProducto/AgregarProducto';
import EliminarProducto from './EliminarProducto/EliminarProducto';
import ModificarProducto from './ModificarProducto/ModificarProducto';
import Politicas from './Politicas/Politicas';
//import ComprarProducto from './CompraProducto/CompraProducto';
import Mapa from './CompraProducto/Mapa';
import DetalleVenta from './DetalleVenta/DetalleVenta';
import MisCompras from './DetalleVenta/MisCompras';
import Profile from './Profile/Profile';
import Description from './Description/Description';
import BuscarProducto from './Navbar/BuscarProducto';
import ProductosList from './db.json';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const { isLoading } = useAuth0();
    const [productos, setProductos] = React.useState(ProductosList);
    React.useEffect(() => {
        setProductos(productos.map(producto => {
            return { ...producto, id: uuidv4() }
        }))
    }, []);

    useEffect(() => {
        localStorage.setItem("productos", JSON.stringify(productos));
    }, [productos]);

    useEffect(() => {
        const productos = JSON.parse(localStorage.getItem("productos"));
        if (productos) {
            setProductos(productos);
        }
    }
        , []);
        


    if (isLoading) {
        return <div className='logo_loader'>
            <span className="loader"></span>
        </div>;
    }
    return (
        <Router>

            {/* <NavBar />
             <NavBar2 /> */}


            <Routes>
                <Route path="/" element={<Home
                    productos={productos}
                    setProductos={setProductos}
                />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/AgregarProducto" element={<AgregarProducto />} />
                <Route path="/EliminarProducto" element={<EliminarProducto />} />
                <Route path="/ModificarProducto" element={<ModificarProducto />} />
                <Route path="/Politicas" element={<Politicas />} />
                {/*  <Route path="/CompraProducto" element={<ComprarProducto />} />*/}
                <Route path="/DetalleVenta" element={<DetalleVenta />} />
                <Route path="/MisCompras" element={<MisCompras />} />
                <Route path="/Description" element={<Description />} />
                <Route path="/search" element={<BuscarProducto />} />
                <Route path="/mapa" element={<Mapa />} />
                <Route path="/categoria/plataformas" element={<Home category="plataformas" />} />
                <Route path="/categoria/battle-royale" element={<Home category="battle-royale" />} />
                <Route path="/categoria/aventura" element={<Home category="aventura" />} />
                <Route path="/categoria/arcade" element={<Home category="arcade" />} />
                <Route path="/categoria/accion" element={<Home category="accion" />} />
                <Route path="/categoria/tiro" element={<Home category="tiro" />} />
                <Route path="/categoria/fps" element={<Home category="fps" />} />
                <Route path="/categoria/tps" element={<Home category="tps" />} />
                <Route path="/categoria/supervivencia" element={<Home category="supervivencia" />} />
                <Route path="/categoria/terror" element={<Home category="terror" />} />
                <Route path="/categoria/deportes" element={<Home category="deportes" />} />
                <Route path="/categoria/lucha" element={<Home category="lucha" />} />
            </Routes>
        </Router>

    );
}

export default App;



