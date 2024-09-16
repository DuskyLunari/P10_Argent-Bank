import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { errorMessage, isLoading, token } = useSelector(state => state.auth);

    useEffect(() => {
        if(token) {
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
        )
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
                            <input type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
        </Layout>
    );
}