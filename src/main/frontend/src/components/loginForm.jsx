import { useState } from "react";
import API from "../utils/API";

function LoginForm(props) {
    const [account, setAccount] = useState({});

    function handleChange(event) {
        const {name, value} = event.target;
        setAccount({ ...account, [name]: value });
    }

    function performLogin(event) {
        event.preventDefault();
        API.login(account)
            .then((res) => {
                props.setCurrentUser(res.data);
                if(res.data.admin) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    console.log("hasAdminPrivileges");
                    props.doAuth(true);
                }
                else{
                    console.log("test");
                    localStorage.setItem("user", "");
                }
                setAccount({username: "", password: ""});
            })
            .catch((err) => console.log(err))
    }

    return(
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
    )
}
export default LoginForm;