import { useParams } from 'react-router-dom';
import ResultsTable from '../components/resultsTable';
import TeamStatsTable from "../components/teamStatsTable";

function SeasonPage(props) {
    const { id } = useParams();

    return (
        <div className="row">
            <div className="col-md-4">
                <h1 className="table-header">Results</h1>
                <ResultsTable seasonId={id}></ResultsTable>
            </div>
            <div className="col-md-8">
                <h1 className="table-header">Team Stats</h1>
                <TeamStatsTable seasonId={id}></TeamStatsTable>
            </div>
        </div>
    )
}

export default SeasonPage;