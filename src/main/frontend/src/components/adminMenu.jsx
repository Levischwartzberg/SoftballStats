import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function AdminMenu(props) {
    let history = useHistory();

    function logout(event) {
        event.preventDefault();
        localStorage.setItem("user", "");
        history.push("/");
        props.logout(false);
    }

    return (
        <nav className="admin-menu">
            <ul className="nav-ul">
                <li className="nav-li">
                    <Link to="/admin/addPlayer">
                        Add Player
                    </Link>
                </li>
                <li className="nav-li">
                    <Link to="/admin/editPlayer">
                        Edit Player
                    </Link>
                </li>
                <li className="nav-li">
                    <Link to="/admin/addGame">
                        Add Game
                    </Link>
                </li>
                <li className="nav-li">
                    <Link to="/admin/editGame">
                        Edit Game
                    </Link>
                </li>
                <li className="nav-li">
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}
export default AdminMenu;