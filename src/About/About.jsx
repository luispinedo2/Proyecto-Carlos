
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
            <article className="article col-12">
                <h2 className="titulo-article">Misión y Visión</h2>
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
        </div>
    );
}
export default About;
