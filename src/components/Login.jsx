// src/Login.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const clientId = 'TU_CLIENT_ID'; // Reemplaza con tu Client ID


//hacer login de dos formas con un formulario y la otra forma con google

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Usuario" />
                <input type="password" placeholder="Contraseña" />
                <button type="submit" onClick={handleLogin}>Iniciar Sesión</button>
            </form>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleLogin}
                    onFailure={(error) => console.log(error)}
                />
            </GoogleOAuthProvider>
        </div>
    );
}

export default Login;

