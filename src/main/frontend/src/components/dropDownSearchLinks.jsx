import {Link} from 'react-router-dom';

function DropDownSearchLinks(props) {

    function clearSearch() {
        props.setSearchText("");
    }
    
    return (
        <div className="results-dropdown">
            <ul>
                {props.results.map((result) => (
                    <li key={result.id}>
                        <Link to={`/playerPage/${result.id}`} onClick={clearSearch}>
                            {result.lastName + ", " + result.firstName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default DropDownSearchLinks;