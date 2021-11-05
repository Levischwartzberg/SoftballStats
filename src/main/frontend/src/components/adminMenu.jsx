import {Link} from 'react-router-dom';

function AdminMenu() {

    return (
        <header>
            <Link to="/admin/addPlayer">
                Add Player
            </Link>
        </header>
    )
}
export default AdminMenu;