import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                alert("Usuario creado exitosamente.");
                navigate("/login");
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Hubo un problema en el registro.");
        }
    };

    return (
        <div className="container mt-5">
            <h2> Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>contraseña:</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    );
};

export default Signup;