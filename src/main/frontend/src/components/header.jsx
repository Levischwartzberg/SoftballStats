import {Link} from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link to="/">
                Home
            </Link>
            <Link to="/players">
                Players
            </Link>
            <Link to="/seasons">
                Seasons
            </Link>
            <Link to="/admin">
                Admin
            </Link>
        </header>
    )
}

export default Header;