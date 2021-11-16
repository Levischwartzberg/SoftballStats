import {Link} from 'react-router-dom';

function AdminMenu() {

    return (
        <header>
            <Link to="/admin/addPlayer">
                Add Player
            </Link>
            <Link to="/admin/editPlayer">
                Edit Player
            </Link>
            <Link to="/admin/addGame">
                Add Game
            </Link>
        </header>
    )
}
export default AdminMenu;