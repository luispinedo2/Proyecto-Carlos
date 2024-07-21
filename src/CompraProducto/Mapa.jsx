// src/components/Mapa.js
import React, { useState } from 'react';

const countries = {
    "Chile": {
        "Santiago": { lat: -33.4489, lng: -70.6693 },
        "Valparaiso": { lat: -33.0472, lng: -71.6127 },
        "Iquique": { lat: -20.2307, lng: -70.1357 },
    },
    "Argentina": {
        "Buenos Aires": { lat: -34.6037, lng: -58.3816 },
        "Córdoba": { lat: -31.4201, lng: -64.1888 },
        "Rosario": { lat: -32.9442, lng: -60.6505 },
    },
    // Añadir más países y ciudades según sea necesario
};

const Mapa = ({ onLocationSelected }) => {
    const [selectedCountry, setSelectedCountry] = useState("Chile");
    const [selectedCity, setSelectedCity] = useState("Iquique");
    const [location, setLocation] = useState(countries["Chile"]["Iquique"]);

    const handleCountryChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        const firstCity = Object.keys(countries[country])[0];
        setSelectedCity(firstCity);
        setLocation(countries[country][firstCity]);
        if (onLocationSelected) {
            onLocationSelected(countries[country][firstCity]);
        }
    };

    const handleCityChange = (event) => {
        const city = event.target.value;
        setSelectedCity(city);
        setLocation(countries[selectedCountry][city]);
        if (onLocationSelected) {
            onLocationSelected(countries[selectedCountry][city]);
        }
    };

    return (
        <div>
            <form>
                <div>
                    <label>
                        País:
                        <select value={selectedCountry} onChange={handleCountryChange}>
                            {Object.keys(countries).map(country => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Ciudad:
                        <select value={selectedCity} onChange={handleCityChange}>
                            {Object.keys(countries[selectedCountry]).map(city => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </form>
            <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14974.360519194397!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915213f43d8d6057%3A0x5b8c5f290362ded4!2s${selectedCity}%2C%20${selectedCountry}!5e0!3m2!1ses-419!2scl!4v1721547173191!5m2!1ses-419!2scl`}
                width="400"
                height="300"
                title="Google Maps"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    );
};

export default Mapa;
