import PlayerGameLog from "../components/playerGameLog.jsx";
import PlayerBio from "../components/playerBio.jsx";
import { useParams } from 'react-router-dom';

function PlayerPage() {
    const { id } = useParams();

    return (
        <div>
            <PlayerBio playerId={id}></PlayerBio>
            <PlayerGameLog playerId={id}></PlayerGameLog>
        </div>
    )
}

export default PlayerPage;