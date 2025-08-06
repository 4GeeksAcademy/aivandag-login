import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn ] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);
	
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setIsLoggedIn(false);
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between align items-center">
				<Link to="/" className="navbar-brand mb-0 h1">
					React Boilerplate
				</Link>

<div className="d-flex gap-2">
	<Link to="/signup">
	<button className="btn btn-outline-primary">Signup</button>
		</Link>

		<Link to="/login">
		<button className="btn btn-outline-success">Login</button>
		</Link>

		<Link to="/private">
		<button className="btn btn-outline-warning">Private</button>
		</Link>

<button onClick={handleLogout} className="btn btn-danger">Logout</button>

</div>
			</div>
		</nav>
	);
};



				{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}
// 			</div>
// 		</nav>
// 	);
// };

{/* <span className="navbar-brand mb-0 h1">React Boilerplate</span> */}