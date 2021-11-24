import LoginForm from "../components/loginForm";

function Home(props) {

    function doAuth(result) {
        props.setIsAuthenticated(result);
    }

    return (
        <div>
            <h1>Welcome to Softball Reference</h1>
            <LoginForm doAuth={doAuth}></LoginForm>
        </div>
    )
}

export default Home;