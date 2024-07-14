import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <div>

            <button className="bi bi-door-open bg-black border-0" onClick={() => loginWithRedirect()}>
                <p>Iniciar Sesión</p>
            </button>
        </div>
    )

}

