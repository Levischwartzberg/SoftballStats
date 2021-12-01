import {Link} from 'react-router-dom';

function AdminMenu() {

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
            </ul>
        </nav>
    )
}
export default AdminMenu;