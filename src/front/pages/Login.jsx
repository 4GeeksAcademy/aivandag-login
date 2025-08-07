import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                alert("Sesion iniciada correctamente");
                navigate("/private");
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error("Error:", err); alert("Hubo un prolema al iniciar sesion.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Inicio de sesion</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>contraseña:</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success">Iniciar sesion</button>
            </form>
        </div>
    );
};

export default Login;