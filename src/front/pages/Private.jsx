import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("debes iniciar sesion para acceder");
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <h2>ZonaPrivada</h2>
            <p>Bienvenido al contenido privado gracias por registrarte con nosotros</p>

        </div>
    );
};

export default Private;