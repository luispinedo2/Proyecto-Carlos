import React, { useState, useEffect } from 'react';
import '../assets/css/Main.css';

export function About() {
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
            <article className="article col-12">
                <h2 className="titulo-article">Bienvenido a GameVerse: Tu Universo de Entretenimiento</h2>
                <p className="text-article">
                    En GameVerse, somos más que una tienda de videojuegos; somos una comunidad apasionada por el entretenimiento interactivo.
                    Desde nuestros humildes comienzos,
                    hemos crecido hasta convertirnos en un destino líder para gamers de todas las edades y niveles de habilidad.
                </p>
                <span className="subtitle-about">Nuestra Misión</span>
                <p className="text-article">
                    Nuestra misión es brindar a nuestros clientes acceso a los mejores videojuegos, consolas y accesorios del mercado,
                    junto con un servicio al cliente excepcional.
                    Creemos en el poder de los videojuegos para conectar a las personas, contar historias increíbles y ofrecer experiencias inolvidables.
                </p>
                <span className="subtitle-about">Nuestra Historia</span>
                <p className="text-article">
                    GameVerse nació del amor por los videojuegos y la tecnología. Fundada por un grupo de entusiastas gamers,
                    nuestra empresa ha evolucionado para mantenerse a la vanguardia de las tendencias y avances en la industria del gaming. A lo largo de los años,
                    hemos forjado alianzas con los principales desarrolladores y distribuidores,
                    permitiéndonos ofrecer una amplia variedad de productos de alta calidad.
                </p>
            </article>
            <article className="article-about col-12">
                <h2 className="titulo-article">Atención al Cliente</h2>
                <p className="text-about">Para cualquier consulta o asistencia, los clientes pueden contactarnos a través de:</p>
                <ul className="lista-about">
                    <li>Teléfono: 123456789</li>
                    <li>Correo Electrónico: Videojuego@gmail.cl</li>
                </ul>
            </article>

            <div className={`scroll-up-btn ${showScroll ? 'show' : ''}`} onClick={scrollUp}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </div>
    );
}

export default About;
