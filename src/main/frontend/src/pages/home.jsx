import LoginForm from "../components/loginForm";

function Home(props) {

    function doAuth(result) {
        props.setIsAuthenticated(result);
    }

    function setCurrentUser(user) {
        props.setCurrentUser(user);
    }

    return (
        <div>
            <h1>Welcome to Softball Reference</h1>
            <LoginForm doAuth={doAuth} setCurrentUser={setCurrentUser}></LoginForm>
        </div>
    )
}

export default Home;