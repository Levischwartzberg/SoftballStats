import PlayerGameLog from "../components/playerGameLog";
import { useParams } from 'react-router-dom';

function PlayerPage() {
    const { id } = useParams();

    return (
        <div>
            <PlayerGameLog playerId={id}></PlayerGameLog>
        </div>
    )
}

export default PlayerPage;