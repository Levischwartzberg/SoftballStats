import PlayerGameLog from "../components/playerGameLog.jsx";
import PlayerBio from "../components/playerBio.jsx";
import PlayerLifetimeStats from "../components/playerLifetimeStats.jsx";
import { useParams } from 'react-router-dom';

function PlayerPage() {
    const { id } = useParams();

    return (
        <div>
            <PlayerBio playerId={id}></PlayerBio>
            <PlayerGameLog playerId={id}></PlayerGameLog>
            <PlayerLifetimeStats playerId={id}></PlayerLifetimeStats>
        </div>
    )
}

export default PlayerPage;