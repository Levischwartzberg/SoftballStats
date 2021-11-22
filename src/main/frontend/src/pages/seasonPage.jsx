import { useParams } from 'react-router-dom';
import ResultsTable from '../components/resultsTable';

function SeasonPage(props) {
    const { id } = useParams();

    return (
        <div>
            <h1 className="table-header">Results</h1>
            <ResultsTable seasonId={id}></ResultsTable>
        </div>
    )
}

export default SeasonPage;