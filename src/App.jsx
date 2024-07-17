import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import NavBar2 from './Navbar/Navbar2';

import Home from './Home/Home';
import About from './About/About';
import ListarProducto from './ListarProducto/ListarProducto';
import AgregarProducto from './AgregarProducto/AgregarProducto';
import EliminarProducto from './EliminarProducto/EliminarProducto';
import ModificarProducto from './ModificarProducto/ModificarProducto';
import Politicas from './Politicas/Politicas';
import ComprarProducto from './CompraProducto/CompraProducto';
import DetalleVenta from './DetalleVenta/DetalleVenta';




function App() {


    const { isLoading } = useAuth0();

    if (isLoading) {
        return <div className='logo_loader'>
            <span className="loader"></span>
        </div>;
    }
    return (
        <Router>
            <NavBar2 />
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/ListarProducto" element={<ListarProducto />} />
                <Route path="/AgregarProducto" element={<AgregarProducto />} />
                <Route path="/EliminarProducto" element={<EliminarProducto />} />
                <Route path="/ModificarProducto" element={<ModificarProducto />} />
                <Route path="/Politicas" element={<Politicas />} />
                <Route path="/CompraProducto" element={<ComprarProducto />} />
                <Route path="/DetalleVenta" element={<DetalleVenta />} />
                <Route path="/categoria/action" element={<div>Acción</div>} />
                <Route path="/categoria/adventure" element={<div>Aventura</div>} />
                <Route path="/categoria/rpg" element={<div>RPG</div>} />
                <Route path="/categoria/sports" element={<div>Deportes</div>} />
                <Route path="/categoria/shooter" element={<div>Shooter</div>} />
            </Routes>

        </Router>

    );
}

export default App;



