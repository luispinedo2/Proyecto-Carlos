import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Profile = () => {
    const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    const [selectedSection, setSelectedSection] = useState("profile");
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("darkTheme");
        if (savedTheme) {
            setDarkTheme(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        if (darkTheme) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
        localStorage.setItem("darkTheme", darkTheme);
    }, [darkTheme]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        loginWithRedirect();
        return <div>Redirigiendo a la página de login...</div>;
    }

    const renderContent = () => {
        switch (selectedSection) {
            case "profile":
                return (
                    <div className="profile-content">
                        <img src={user.picture} alt={user.name} className="profile-picture" />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                );
            case "settings":
                return (
                    <div className="profile-content">
                        <h2>Configuraciones</h2>
                        <div>
                            <label>
                                Notificaciones:
                                <input type="checkbox" checked />
                            </label>
                        </div>
                        <div>
                            <label>
                                Tema oscuro:
                                <input
                                    type="checkbox"
                                    checked={darkTheme}
                                    onChange={() => setDarkTheme(!darkTheme)}
                                />
                            </label>
                        </div>
                    </div>
                );
            case "orders":
                return (
                    <div className="profile-content">
                        <h2>Mis Compras</h2>
                        <ul>
                            <li>Pedido #12345 - 20/07/2024</li>
                            <li>Pedido #12346 - 15/06/2024</li>
                            <li>Pedido #12347 - 10/05/2024</li>
                        </ul>
                    </div>
                );
            case "support":
                return (
                    <div className="profile-content">
                        <h2>Soporte</h2>
                        <p>¿Necesitas ayuda? Contacta al soporte en support@gameverse.com.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-menu">
                <ul>
                    <li onClick={() => setSelectedSection("profile")}>Perfil</li>
                    <li onClick={() => setSelectedSection("settings")}>Configuraciones</li>
                    <li onClick={() => setSelectedSection("orders")}>Mis Compras</li>
                    <li onClick={() => setSelectedSection("support")}>Soporte</li>
                </ul>
            </div>
            <div className="profile-content-container">
                {renderContent()}
            </div>
        </div>
    );
}

export default Profile;
