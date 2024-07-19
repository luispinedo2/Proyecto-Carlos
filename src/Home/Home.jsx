import React, { useEffect, useState } from "react";
import '../assets/css/Main.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Carousel } from './carrusel';


const productosinicial = [
    { id: uuidv4(), imagen: 'img/OIP.jpeg', nombre: 'MARIO BROSS', precio: 20000, descripcion: "Clásico juego de plataformas y aventuras.", stock: 120, categoria: 'Plataformas' },
    { id: uuidv4(), imagen: 'img/fortnite.jpg', nombre: 'FORTNITE', precio: 10000, descripcion: "Popular juego de disparos y construcción.", stock: 120, categoria: 'Battle Royale' },
    { id: uuidv4(), imagen: 'img/zelda.jpeg', nombre: 'ZELDA', precio: 10000, descripcion: "Épico juego de aventuras y exploración.", stock: 120, categoria: 'Aventura' },
    { id: uuidv4(), imagen: 'img/freefire.jpeg', nombre: 'FREE FIRE', precio: 5000, descripcion: "Juego de disparos y supervivencia.", stock: 120, categoria: 'Battle Royale' },
    { id: uuidv4(), imagen: 'img/pacman.jpeg', nombre: 'PACMAN', precio: 80000, descripcion: "Clásico juego arcade de laberintos.", stock: 120, categoria: 'Arcade' },
    { id: uuidv4(), imagen: 'img/metalslug.jpeg', nombre: 'METAL SLUG', precio: 90000, descripcion: "Intenso juego de disparos en 2D.", stock: 120, categoria: 'Acción' },
    { id: uuidv4(), imagen: 'img/duck.jpeg', nombre: 'DUCK HUNT', precio: 11000, descripcion: "Juego de caza con pistola de luz.", stock: 120, categoria: 'Tiro' },
    { id: uuidv4(), imagen: 'img/donkeykong.jpeg', nombre: 'DONKEY KONG', precio: 6000, descripcion: "Clásico juego de plataformas y aventuras.", stock: 120, categoria: 'Plataformas' },
    { id: uuidv4(), imagen: 'img/contra.jpeg', nombre: 'CONTRA', precio: 30000, descripcion: "Acción y disparos en un clásico 2D.", stock: 120, categoria: 'Acción' },
    { id: uuidv4(), imagen: 'img/crash.png', nombre: 'CRASH', precio: 40000, descripcion: "Juego de plataformas con un divertido personaje.", stock: 120, categoria: 'Plataformas' },
    { id: uuidv4(), imagen: 'img/call.jpeg', nombre: 'CALL OF DUTY', precio: 70000, descripcion: "Famoso juego de disparos en primera persona.", stock: 120, categoria: 'FPS' },
    { id: uuidv4(), imagen: 'img/halo.jpeg', nombre: 'HALO', precio: 80000, descripcion: "Juego de disparos futurista y épico.", stock: 120, categoria: 'FPS' },
    { id: uuidv4(), imagen: 'img/GEARS.jpeg', nombre: 'GEARS OF WAR', precio: 90000, descripcion: "Intenso juego de disparos en tercera persona.", stock: 120, categoria: 'TPS' },
    { id: uuidv4(), imagen: 'img/ASSASSINS.jpeg', nombre: 'ASSASSINS CREED', precio: 10000, descripcion: "Juego de acción y sigilo histórico.", stock: 120, categoria: 'Acción' },
    { id: uuidv4(), imagen: 'img/GOD.jpeg', nombre: 'GOD OF WAR', precio: 20000, descripcion: "Épico juego de acción y mitología.", stock: 120, categoria: 'Acción' },
    { id: uuidv4(), imagen: 'img/SPIDERMAN.jpeg', nombre: 'SPIDERMAN', precio: 30000, descripcion: "Aventura de superhéroes en Nueva York.", stock: 120, categoria: 'Acción' },
    { id: uuidv4(), imagen: 'img/THE-LAST.jpeg', nombre: 'THE LAST OF US', precio: 40000, descripcion: "Juego de supervivencia y narrativa emocional.", stock: 120, categoria: 'Supervivencia' },
    { id: uuidv4(), imagen: 'img/UNCHARTED.jpeg', nombre: 'UNCHARTED', precio: 50000, descripcion: "Aventuras y tesoros en acción trepidante.", stock: 120, categoria: 'Aventura' },
    { id: uuidv4(), imagen: 'img/RESIDENT.jpeg', nombre: 'RESIDENT EVIL', precio: 60000, descripcion: "Juego de terror y supervivencia.", stock: 120, categoria: 'Terror' },
    { id: uuidv4(), imagen: 'img/FIFA23.jpeg', nombre: 'FIFA', precio: 70000, descripcion: "Popular juego de fútbol y deportes.", stock: 120, categoria: 'Deportes' },
    { id: uuidv4(), imagen: 'img/PES21.jpeg', nombre: 'PES', precio: 80000, descripcion: "Simulación de fútbol realista.", stock: 120, categoria: 'Deportes' },
    { id: uuidv4(), imagen: 'img/NBA.jpeg', nombre: 'NBA', precio: 90000, descripcion: "Juego de baloncesto profesional.", stock: 120, categoria: 'Deportes' },
    { id: uuidv4(), imagen: 'img/MLB.jpeg', nombre: 'MLB', precio: 10000, descripcion: "Simulación de béisbol profesional.", stock: 120, categoria: 'Deportes' },
    { id: uuidv4(), imagen: 'img/NFL.jpeg', nombre: 'NFL', precio: 20000, descripcion: "Juego de fútbol americano.", stock: 120, categoria: 'Deportes' },
    { id: uuidv4(), imagen: 'img/UFC.jpeg', nombre: 'UFC', precio: 30000, descripcion: "Simulación de artes marciales mixtas.", stock: 120, categoria: 'Deportes' },
    { id: uuidv4(), imagen: 'img/MORTAL.jpeg', nombre: 'MORTAL KOMBAT', precio: 40000, descripcion: "Clásico juego de lucha y combate.", stock: 120, categoria: 'Lucha' },
    { id: uuidv4(), imagen: 'img/STREET.jpeg', nombre: 'STREET FIGHTER', precio: 50000, descripcion: "Icónico juego de lucha callejera.", stock: 120, categoria: 'Lucha' },
];

export function Home() {


    const [productos, setProductos] = useState(productosinicial);

    useEffect(() => {
        const productosLocalStorage = JSON.parse(localStorage.getItem('productos'));
        if (productosLocalStorage) {
            setProductos(productosLocalStorage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }
        , [productos]);



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
        <div className="container-home">
            <Carousel />

            <header className="header">
                <h1 className="titulo-header">Bienvenido a GameVerse</h1>
            </header>
            <article className="article col-12">
                <h2 className="titulo-article">¿A QUE NOS DEDICAMOS?</h2>
                <p className="text-article">
                    En GameVerse, nos dedicamos a ser tu principal fuente de entretenimiento interactivo,
                    ofreciendo una amplia gama de productos y servicios en el mundo de los videojuegos.
                    Proveemos una extensa colección de videojuegos para todas las plataformas,
                    desde consolas populares como PlayStation, Xbox y Nintendo Switch, hasta juegos para PC y dispositivos móviles.
                    Además, ofrecemos los últimos modelos de consolas, accesorios esenciales como controladores, auriculares y sistemas de sonido,
                    así como equipos de realidad virtual para una experiencia de juego inmersiva. También facilitamos la compra y descarga de contenidos digitales,
                    incluyendo juegos, DLCs y suscripciones a servicios como Xbox Game Pass y PlayStation Plus.
                    Nuestro compromiso con la calidad y la innovación se refleja en cada producto que ofrecemos,
                    y nuestro equipo de atención al cliente está siempre disponible para garantizar una experiencia de compra sin inconvenientes.
                    En resumen, en GameVerse nos apasiona ofrecer todo lo que necesitas para llevar tu experiencia de juego al siguiente nivel.
                </p>
            </article>
            <section className="productos">
                {/*mostrar los productos que se encuentran en el local storage*/}
                <div className="container mt-4">
                    <h1 className="titulo-productos">Productos Disponibles</h1>
                    <p className="text-compra">Si desea comprar ir al siguiente enlace
                        <i className="bi bi-arrow-down"></i>
                    </p>
                    <Link to="/CompraProducto" className="link-compra">Comprar Productos</Link>
                    <div className="row">
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <div className="col-md-3 mb-3" key={producto.id}>
                                    <div className="card">
                                        <img src={producto.imagen} alt={producto.nombre} className="card-img-top imagen" />
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">${producto.precio.toLocaleString()}</p>
                                            <p className="card-text">{producto.descripcion}</p>
                                            <p className="card-text">Cantidad de Stock: {producto.stock}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos en el localStorage</p>
                        )}
                    </div>
                </div>
            </section>
            <section className="noticias">
                <h2 className="titulo-noticias">Noticias</h2>
                <span className="subtitulo-noticias">
                    GameVerse Anuncia el Lanzamiento Exclusivo del Anticipado Juego "Galaxy Warriors"
                </span>
                <p className="text-noticias">
                    20 de junio de 2024, Ciudad de Iquique - GameVerse, líder en la industria de los videojuegos,
                    se complace en anunciar el lanzamiento exclusivo de "Galaxy Warriors", uno de los títulos más esperados del año.
                    Desarrollado por el aclamado estudio de juegos Stellar Forge,
                    "Galaxy Warriors" promete llevar a los jugadores a una aventura épica a través del cosmos.
                    "Galaxy Warriors" es un juego de rol y acción que combina una narrativa profunda con impresionantes gráficos de última generación.
                    Los jugadores asumirán el rol de un comandante de una flota estelar,
                    enfrentándose a desafíos estratégicos y batallas intergalácticas en su misión por salvar la galaxia de una antigua amenaza.
                    Con un vasto universo para explorar, personajes complejos y una jugabilidad innovadora, "Galaxy Warriors" está preparado para redefinir el género de los juegos espaciales.
                    "Estamos emocionados de ofrecer 'Galaxy Warriors' en exclusiva para nuestros clientes", dijo Laura Méndez, Directora de Marketing de GameVerse.
                    "Este juego es una muestra del compromiso de GameVerse de traer los títulos más emocionantes y de alta calidad a nuestra comunidad de jugadores.
                    Esperamos que nuestros clientes disfruten de esta experiencia única tanto como nosotros disfrutamos colaborando con Stellar Forge para hacerlo posible."
                </p>
            </section>

            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div >

    );
}

export default Home;
