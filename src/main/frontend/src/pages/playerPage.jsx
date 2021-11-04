import PlayerGameLog from "../components/playerGameLog.jsx";
import PlayerBio from "../components/playerBio.jsx";
import PlayerLifetimeStats from "../components/playerLifetimeStats.jsx";
import PlayerSeasonStats from "../components/playerSeasonStats.jsx";
import { useParams } from 'react-router-dom';

function PlayerPage() {
    const { id } = useParams();

    return (
        <div>
            <PlayerBio playerId={id}></PlayerBio>
            <PlayerLifetimeStats playerId={id}></PlayerLifetimeStats>
            <PlayerSeasonStats playerId={id}></PlayerSeasonStats>
            <PlayerGameLog playerId={id}></PlayerGameLog>
        </div>
    )
}

export default PlayerPage;