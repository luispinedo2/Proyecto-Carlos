// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import ListarProducto from './components/ListarProducto';
import AgregarProducto from './components/AgregarProducto';
import EliminarProducto from './components/EliminarProducto';
import ModificarProducto from './components/ModificarProducto';
import Politicas from './components/Politicas';
import ComprarProducto from './components/CompraProducto';
import DetalleVenta from './components/DetalleVenta';



function App() {


    return (
        <Router>
            <NavBar />

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/ListarProducto" element={<ListarProducto />} />
                <Route path="/AgregarProducto" element={<AgregarProducto />} />
                <Route path="/EliminarProducto" element={<EliminarProducto />} />
                <Route path="/ModificarProducto" element={<ModificarProducto />} />
                <Route path="/Politicas" element={<Politicas />} />
                <Route path="/CompraProducto" element={<ComprarProducto />} />
                <Route path="/DetalleVenta" element={<DetalleVenta />} />
            </Routes>

        </Router>

    );
}

export default App;
