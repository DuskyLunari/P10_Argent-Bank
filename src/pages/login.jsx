import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { loginAction } from "../redux/features/auth/auth.actions";

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { errorMessage, isLoading, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            navigate("/profile");
        }
    }, [token, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);

        dispatch(
            loginAction({
                email: fd.get("email"),
                password: fd.get("password"),
            })
        );
    };

    return (
        <Layout>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input 
                                name="email" 
                                type="text" 
                                id="username" 
                                defaultValue="tony@stark.com" 
                                disabled={isLoading} 
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input 
                                name="password" 
                                type="password" 
                                id="password" 
                                defaultValue="password123" 
                                disabled={isLoading} 
                            />
                        </div>
                        <div className="input-remember">
                            <input 
                                type="checkbox" 
                                id="remember-me" 
                                disabled={isLoading} 
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button 
                            type="submit" 
                            className="sign-in-button" 
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading ..." : "Sign In"}
                        </button>
                        {errorMessage && (
                            <p className="error-message">
                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                {" "}
                                {errorMessage}
                            </p>
                        )}
                    </form>
                </section>
            </main>
        </Layout>
    );
}