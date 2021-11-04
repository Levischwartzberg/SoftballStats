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
        </header>
    )
}

export default Header;