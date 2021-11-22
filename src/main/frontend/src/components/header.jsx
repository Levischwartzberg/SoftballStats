import {Link} from 'react-router-dom';

function Header() {
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/players">
                        Players
                    </Link>
                </li>
                <li>
                    <Link to="/seasons">
                        Seasons
                    </Link>
                </li>
                <li>
                    <Link to="/admin">
                        Admin
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header;