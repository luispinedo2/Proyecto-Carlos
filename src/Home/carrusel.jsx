import React, { useState, useEffect } from 'react'; // Importamos React y los hooks useState y useEffect


export const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Creamos un estado para el índice activo del carrusel
    const images = [ // Array de objetos que contiene la información de cada imagen
        {
            src: 'img/freefire.jpeg',
            alt: 'First slide',
            /*
            caption: 'Aventuras en Free Fire',
            description: 'Vive la emoción de la supervivencia y la estrategia.',*/
        },
        {
            src: 'img/fortnite.jpg',
            alt: 'Second slide',
            /*
            caption: 'Batalla Royale de Fortnite',
            description: 'Únete a la batalla en el mundo de Fortnite.',*/
        },
        {
            src: 'img/zelda.jpeg',
            alt: 'Third slide',
            /*
            caption: 'Aventuras de Zelda',
            description: 'Explora el mundo mágico de Zelda y sus misterios.',*/
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => { // Configuramos un intervalo para cambiar las imágenes cada 3 segundos
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length); // Cambiamos al siguiente índice de imagen
        }, 4000); // Cambia cada 3 segundos

        return () => clearInterval(interval); // Limpiamos el intervalo cuando el componente se desmonte
    }, [images.length]); // Dependencia de la longitud del array de imágenes

    return (
        <div id="carouselExampleCaptions" className="carousel slide"> {/* Contenedor principal del carrusel */}
            <div className="carousel-indicators"> {/* Indicadores del carrusel */}
                {/* el _ es una convención para indicar que no se va a usar la variable */}
                {images.map((_, index) => ( // Mapeamos los indicadores para cada imagen
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === activeIndex ? 'active' : ''} // Indicador activo basado en el índice
                        aria-current={index === activeIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setActiveIndex(index)} // Cambiamos la imagen activa al hacer clic en el indicador
                    ></button>
                ))}
            </div>
            <div className="carousel-inner"> {/* Contenedor de las imágenes del carrusel */}
                {images.map((image, index) => ( // Mapeamos cada imagen en el carrusel
                    <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}> {/* Elemento del carrusel */}
                        <img src={image.src} className="img-slide" alt={image.alt} /> {/* Imagen del carrusel */}
                        <div className="carousel-caption d-none d-md-block"> {/* Texto de la imagen */}
                            <h5>{image.caption}</h5>
                            <p>{image.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
                onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)} // Cambiamos a la imagen anterior
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)} // Cambiamos a la siguiente imagen
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};


