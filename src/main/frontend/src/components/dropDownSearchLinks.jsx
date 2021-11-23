import {Link} from 'react-router-dom';

function DropDownSearchLinks(props) {

    function clearSearch() {
        props.setSearchText("");
    }
    
    return (
        <div className="results-dropdown">
            {props.results.map((result) => (
                <div key={result.id}>
                    <Link to={`/playerPage/${result.id}`} onClick={clearSearch}>
                        {result.lastName + ", " + result.firstName}
                    </Link>
                    <br/>
                </div>
            ))}
        </div>
    )
}
export default DropDownSearchLinks;