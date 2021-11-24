import { useState } from "react";
import API from "../utils/API";

function LoginForm(props) {
    const [account, setAccount] = useState({});

    function handleChange(event) {
        const {name, value} = event.target;
        setAccount({ ...account, [name]: value });
    }

    function doTheThing(event) {
        event.preventDefault();
        API.login(account)
            .then((res) => {
                if(res.data === "hasAdminPrivileges") {
                    console.log("hasAdminPrivileges");
                    props.doAuth(true);
                }
                else {
                    console.log(res.data);
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
            <button onClick={doTheThing}>Login</button>
        </div>
    )
}
export default LoginForm;