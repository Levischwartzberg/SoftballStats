import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import DropDownSearchLinks from './dropDownSearchLinks';
import API from '../utils/API';

function Header(props) {
    const [searchText, setSearchText] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const [results, setResults] = useState([]);
    const [players, setPlayers] = useState([]);

    function handleChange(event) {
		setSearchText(event.target.value);
	}

    useEffect(() => {
        loadPlayers();
    },[])

    useEffect(() => {
        if(searchText.length > 1) {
            setDropdown(true);
            setResults(lookupPlayer(searchText));
        }
        else {
            setDropdown(false);
        }
    },[searchText])

    function loadPlayers() {
        API.getPlayers()
            .then((res) => {
                let playerArray = res.data;
                return playerArray;
            })
            .then((playerArray) => setPlayers(playerArray))
            .catch((err) => console.log(err));
    }

    function lookupPlayer(search) {
        search = search.toLowerCase();
        const filtered = [];
        players.forEach((player) => {
            if(player.firstName.toLowerCase().includes(search) || player.lastName.toLowerCase().includes(search)) {
                filtered.push(player);
            }
        })
        return filtered;
    }

    return (
        <nav className="main-nav">
            <ul className="nav-ul">
                <li className="nav-li">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-li">
                    <Link to="/players">
                        Players
                    </Link>
                </li>
                <li className="nav-li">
                    <Link to="/seasons">
                        Seasons
                    </Link>
                </li>
                {props.auth === true && (
                    <li className="nav-li">
                        <Link to="/admin">
                            Admin
                        </Link>
                    </li>
                )}
            </ul>
            <div className="nav-li-search">
                <label htmlFor="searchInput">
                    Search Player
                </label>
                <input className="player-search" type="text" onChange={handleChange} value={searchText} name="searchInput"/>
                {dropdown === true && (
                    <DropDownSearchLinks classname="results-dropdown" results={results} setSearchText={setSearchText}></DropDownSearchLinks>
                )}
            </div>
        </nav>
    )
}

export default Header;