import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {

    const { user, isAuthenticated } = useAuth0();
    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ) : (
                <div>
                    <h2>Por favor logueate</h2>
                </div>
            )}
        </div>
    )

}
