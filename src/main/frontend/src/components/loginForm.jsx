import { useState } from "react";
import API from "../utils/API";

function LoginForm(props) {
    const [account, setAccount] = useState({});
    const [loginVisible, setLoginVisible] = useState(false);
    const [buttonText, setButtonText] = useState((localStorage.getItem("user") !== "" && localStorage.getItem("user") !== null) ? "Logout" : "Admin Login");

    function handleChange(event) {
        const {name, value} = event.target;
        setAccount({ ...account, [name]: value });
    }

    function toggleLogin(event) {
        event.preventDefault();
        if(event.target.name === "Admin Login") {
            setLoginVisible(!loginVisible);
        }
        if(event.target.name === "Logout") {
            performLogout();
        }
    }

    function performLogin(event) {
        event.preventDefault();
        API.login(account)
            .then((res) => {
                if(res.data.admin) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    props.doAuth(true);
                }
                else{
                    localStorage.setItem("user", "");
                    props.doAuth(false);
                }
                setAccount({username: "", password: ""});
                setLoginVisible(false);
                setButtonText("Logout");
            })
            .catch((err) => console.log(err))
    }

    function performLogout() {
        localStorage.setItem("user", "");
        props.doAuth(false);
        setButtonText("Admin Login");
    }

    return(
        <div>
            <button onClick={toggleLogin} name={buttonText}>{buttonText}</button>
            {loginVisible && (
                <div>
                    <label htmlFor="username">
                        Username: 
                        <input type="text" name="username" onChange={handleChange} value={account.username}/>
                    </label>
                    <label htmlFor="password">
                        Password: 
                        <input type="password" name="password" onChange={handleChange} value={account.password}/>
                    </label>
                    <button onClick={performLogin}>Login</button>
                </div>
            )}
        </div>
    )
}
export default LoginForm;